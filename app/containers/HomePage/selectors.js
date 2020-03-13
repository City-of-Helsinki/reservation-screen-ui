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
 * Select list of free slots.
 */
// const makeFreeSlots = () =>
//  createSelector(selectHome, state => state.get('reservations'));

/**
 * Find time until resource is occupied again.
 */
const makeSelectAvailableUntil = () =>
  createSelector(selectHome, state => {
    // Get resource.
    const resource = state.get('resource');

    if (!resource) {
      return false;
    }

    // Get current time.
    const currentTime = state.get('date');

    // Get opening times.
    const openingHoursForToday = getOpeningHoursForDay(resource, currentTime);

    // Closing time not available. Default to 22.00.
    const defaultClosingTime = new Date();
    defaultClosingTime.setHours(22);
    defaultClosingTime.setMinutes(0);
    defaultClosingTime.setSeconds(0);
    const closes = openingHoursForToday
      ? openingHoursForToday.get('closes')
      : defaultClosingTime;

    // Continue if we have reservations.
    if (
      resource.has('reservations') &&
      resource.get('reservations') &&
      resource.get('reservations').size > 0
    ) {
      const reservations = resource
        .get('reservations')
        // The reservation list contains reservations for the entire
        // week so we must filter out all the ones that don't take place
        // during today.
        .filter(reservation => {
          const today = new Date();
          const begin = new Date(reservation.get('being'));

          return (
            today.getDate() === begin.getDate() &&
            today.getMonth() === begin.getMonth() &&
            today.getYear() === begin.getYear()
          );
        });

      // Find current reservation.
      const currentReservation = reservations.find(
        reservation =>
          new Date(reservation.get('begin')).getTime() <=
            currentTime.getTime() &&
          new Date(reservation.get('end')).getTime() >= currentTime.getTime(),
      );

      // Resource is not free at the moment!
      // Impossible to say "how long the resource is still available."
      if (currentReservation) {
        return false;
      }

      // Find next reservation.
      const nextReservation = reservations.find(
        reservation =>
          new Date(reservation.get('begin')).getTime() > currentTime.getTime(),
      );

      // Resource is available until the next reservation starts.
      if (nextReservation) {
        return new Date(nextReservation.get('begin'));
      }

      // If there are no other reservations, the resource is available
      // until closing time.
    }

    // No reservations at all. Next resource is available until closing time.
    return new Date(closes);
  });

/**
 * Find time when the resource is available next.
 */
const makeSelectNextAvailableTime = () =>
  createSelector(makeSelectFreeSlots(1), ([slot]) => {
    if (!slot) {
      return false;
    }

    return slot.begin;
  });

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
const makeSelectFreeSlots = amount =>
  createSelector(selectHome, state => {
    // Get variables from state.
    const resource = state.get('resource');
    const slotSize = state.getIn(['resource', 'slot_size']);
    const date = state.get('date');
    let freeSlots = [];

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

      const defaultOpeningTime = new Date(new Date().setHours(0, 0, 0, 0));
      const defaultClosingTime = new Date(new Date().setHours(23, 59, 59, 59));
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

      const reservations = resource.get('reservations');

      // Filter slots that overlap with a reservation because they are
      // not free.
      freeSlots = allUpcomingSlotsForToday.filter(
        slot => !slotOverlapsWithReservations(slot, reservations),
      );
    }

    return freeSlots.slice(0, amount);
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
