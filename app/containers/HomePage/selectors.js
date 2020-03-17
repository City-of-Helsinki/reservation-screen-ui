/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import dateFormat from 'dateformat';
import { initialState } from './reducer';

function getOpeningHoursForDay(resource, day) {
  return resource.get('opening_hours').find(openingHour => {
    const date = dateFormat(new Date(day), 'yyyy-mm-dd');
    const openingHourDate = dateFormat(
      new Date(openingHour.get('date')),
      'yyyy-mm-dd',
    );

    return date === openingHourDate;
  });
}

// Home state from store.
const selectHome = state => state.get('home', initialState);

/**
 * Return true is the space is open right now.
 */
const makeSelectIsResourceAvailable = () =>
  createSelector(selectHome, state => {
    // Start by getting resource from store.
    const resource = state.get('resource');
    const date = state.get('date');

    // Continue only if resource exists and has reservations.
    if (
      resource &&
      resource.has('reservations') &&
      resource.get('reservations')
    ) {
      // Get list of current.
      const currentReservations = resource
        .get('reservations')
        .filter(
          reservation =>
            new Date(reservation.get('begin')).getTime() <= date.getTime() &&
            new Date(reservation.get('end')).getTime() > date.getTime(),
        );

      return !(currentReservations.size > 0);
    }
    return true;
  });

function getSlotSizeInTime(time) {
  if (!time) {
    return null;
  }

  const [hours, minutes] = time.split(':');
  const startDateTime = new Date(2000, 0, 1, 0, 0, 0, 0);
  const endDateTime = new Date(2000, 0, 1, hours, minutes, 0, 0);
  const timeDifference = endDateTime.getTime() - startDateTime.getTime();

  return timeDifference;
}

function slotOverlapsWithReservations(slot, reservations) {
  const slotBegin = slot.begin.getTime();
  const slotEnd = slot.end.getTime();

  return reservations.reduce((acc, reservation) => {
    const reservationBegin = new Date(reservation.get('begin')).getTime();
    const reservationEnd = new Date(reservation.get('end')).getTime();

    const isAfter = slotBegin >= reservationEnd && slotEnd >= reservationEnd;
    const isBefore =
      slotEnd <= reservationBegin && slotBegin <= reservationBegin;
    const overlaps = !(isAfter || isBefore);

    return acc || overlaps;
  }, false);
}

/**
 * Get list of free slots.
 */
const makeSelectSlots = () =>
  createSelector(selectHome, state => {
    // Get variables from state.
    const resource = state.get('resource');
    const slotSize = state.getIn(['resource', 'slot_size']);
    const date = state.get('date');

    const now = new Date(date);
    // Ignore current seconds and milliseconds.
    now.setSeconds(0, 0);

    if (resource) {
      // Transform timestamp (HH:MM:SS...) into milliseconds
      const slotSizeInTime = getSlotSizeInTime(slotSize);

      const nowTime = now.getTime();
      const startOfNowDayTime = new Date(nowTime).setHours(0, 0, 0, 0); // setHours returns unix time
      // The remainder represents the amount of time that is left over
      // when nowTime is fitted into slots. NowTime is the amount of
      // milliseconds relative to the seventies, so we are shifting
      // that to only take the day in question into account in order to
      // avoid big numbers. Do the toFixed hack to avoid dealing with
      // floats.
      const remainder = Number(
        ((nowTime - startOfNowDayTime) % slotSizeInTime).toFixed(0),
      );
      // Go to current slot's beginning by ignoring left over time.
      const currentSlotStartTime = new Date(nowTime - remainder);

      const defaultOpeningTime = new Date(new Date(now).setHours(0, 0, 0, 0));
      const defaultClosingTime = new Date(
        new Date(now).setHours(23, 59, 59, 59),
      );
      const openingHours = getOpeningHoursForDay(resource, now);
      // Opening ang closing hours are date time stamps.
      const opens = new Date(openingHours.get('opens', defaultOpeningTime));
      const closes = new Date(openingHours.get('closes', defaultClosingTime));

      const currentSlotIsBeforeOpeningTime =
        currentSlotStartTime.getTime() < opens.getTime();
      // If current slot begins before opening time, use opening time
      // instead.
      const slotsStartTime = currentSlotIsBeforeOpeningTime
        ? opens
        : currentSlotStartTime;
      const slotsEndTime = closes;

      // Build all the possible slots for today. This is done by finding
      // the difference between slotsEndTime and slotsStartTime and then
      // finding out how many slots can be fitted into it. The yielded
      // slot count is used for creating all current and upcoming slots
      // for today.
      const slotCount =
        (slotsEndTime.getTime() - slotsStartTime.getTime()) / slotSizeInTime;
      const allUpcomingSlotsForToday = Array.from(
        { length: slotCount },
        (_, i) => {
          const slotBegin = new Date(
            slotsStartTime.getTime() + i * slotSizeInTime,
          );
          const slotEnd = new Date(slotBegin.getTime() + slotSizeInTime);

          return { begin: slotBegin, end: slotEnd };
        },
      );

      return allUpcomingSlotsForToday;
    }

    return [];
  });

/**
 * Get list of free slots.
 */
const makeSelectFreeSlots = amount =>
  createSelector(
    selectHome,
    makeSelectSlots(),
    (state, allUpcomingSlotsForToday) => {
      const resource = state.get('resource');

      if (resource) {
        const reservations = resource.get('reservations');

        // Filter slots that overlap with a reservation because they are
        // not free.
        const freeSlotsForToday = allUpcomingSlotsForToday.filter(
          slot => !slotOverlapsWithReservations(slot, reservations),
        );

        return freeSlotsForToday.slice(0, amount);
      }

      return [];
    },
  );

function getFallbackClosingTime(allSlots, openingHours) {
  const closes = new Date(openingHours.get('closes'));
  const lastSlot = allSlots[allSlots.length - 1];

  // If there are no hours the current time is past opening hours.
  // In that case, use closing time as a fallback.
  if (!lastSlot) {
    return closes;
  }

  return lastSlot.end;
}

/**
 * Find time until resource is occupied again.
 */
const makeSelectAvailableUntil = () =>
  createSelector(
    selectHome,
    makeSelectSlots(),
    (state, allUpcomingSlotsForToday) => {
      const now = new Date(state.get('date'));
      const resource = state.get('resource');

      if (!resource) {
        return false;
      }

      const openingHours = getOpeningHoursForDay(resource, now);
      const fallbackTime = getFallbackClosingTime(
        allUpcomingSlotsForToday,
        openingHours,
      );
      const reservations = resource.get('reservations');

      if (reservations && reservations.size > 0) {
        const reservedSlots = allUpcomingSlotsForToday.filter(slot =>
          slotOverlapsWithReservations(slot, reservations),
        );

        const [nextReservedSlot] = reservedSlots;

        // If there is no next reservation, the resource is open until
        // fallbackTime.
        if (!nextReservedSlot) {
          return fallbackTime;
        }

        // If the slot has already started, the resource is not
        // currently available, so it can't be "available until a time".
        if (nextReservedSlot.begin.getTime() <= now.getTime()) {
          return false;
        }

        return nextReservedSlot.begin;
      }

      // If there are no reservations, the resource is open until the
      // last slot or closing time.
      if (!reservations || reservations.size === 0) {
        return fallbackTime;
      }

      // If we could not find a next available time, just return false.
      return false;
    },
  );

/**
 * Find time when the resource is available next.
 */
const makeSelectNextAvailableTime = () =>
  createSelector(makeSelectFreeSlots(1), ([slot]) => {
    if (!slot) {
      return false;
    }

    return new Date(slot.begin);
  });

const makeSelectScene = () =>
  createSelector(selectHome, homeState => homeState.get('scene'));

const makeSelectSelectedSlot = () =>
  createSelector(selectHome, homeState => homeState.get('selectedSlot'));

const makeSelectDate = () =>
  createSelector(selectHome, homeState => homeState.get('date'));

const makeSelectIsDescriptionOpen = () =>
  createSelector(selectHome, homeState => homeState.get('isDescriptionOpen'));

const makeSelectErrorMessage = () =>
  createSelector(selectHome, homeState => homeState.get('errorMessage'));

const makeSelectResource = () =>
  createSelector(selectHome, state => state.get('resource', undefined));

export {
  selectHome,
  makeSelectResource,
  makeSelectIsResourceAvailable,
  makeSelectDate,
  makeSelectScene,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
  makeSelectFreeSlots,
  makeSelectSelectedSlot,
  makeSelectIsDescriptionOpen,
  makeSelectErrorMessage,
};
