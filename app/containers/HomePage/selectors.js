/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import dateFormat from 'dateformat';
import { initialState } from './reducer';

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
    const openingHoursForToday = resource
      .get('opening_hours')
      .find(openingHour => {
        const date = dateFormat(new Date(currentTime), 'yyyy-mm-dd');
        const openingHourDate = dateFormat(
          new Date(openingHour.get('date')),
          'yyyy-mm-dd',
        );

        return date === openingHourDate;
      });
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

function getHours(hours, minutes) {
  const minutesInHours = Number(minutes) / 60;

  return Number(hours) + minutesInHours;
}

function getSlotSizeInHours(time) {
  if (!time) {
    return null;
  }

  const [hours, minutes] = time.split(':');

  return getHours(hours, minutes);
}

function getHoursAndMinutes(hours) {
  const wholeHours = Number(hours.toFixed(0));
  const minutes = Number((hours % 1).toFixed(3)) * 60;

  return [wholeHours, minutes];
}

/**
 * Get list of free slots. I'm not proud of this implementation. If someone has better ideas feel free to fix :)
 */
const makeSelectFreeSlots = amount =>
  createSelector(selectHome, state => {
    // Get variables from state.
    const resource = state.get('resource');
    const minPeriod = state.getIn(['resource', 'min_period']);
    const slotSize = state.getIn(['resource', 'slot_size']);
    let begin = state.get('date');
    const freeSlots = [];
    const minPeriodTimestamp = `1970-01-01T${minPeriod}Z`;
    const minPeriodMilliseconds = new Date(minPeriodTimestamp); // .getTime();

    // Begin always on even minute.
    begin.setSeconds(0);
    begin.setMilliseconds(0);

    // Calculate new begin time. Slot begins always at previous even hours or
    // half hours. So if the time is 15:15 fixed begin time is 15:00.
    // If time is 15:35 fixed time is 15:30.
    let fixedBeginTime = new Date(begin);
    fixedBeginTime.setSeconds(0);
    fixedBeginTime.setMilliseconds(0);

    if (resource) {
      // To avoid the weird stuff floats and division can cause, we are
      // only taking the first three decimals into count.
      const slotSizeInHours = Number(getSlotSizeInHours(slotSize).toFixed(3));
      const fixedBeginTimeHours = Number(
        getHours(
          fixedBeginTime.getHours(),
          fixedBeginTime.getMinutes(),
        ).toFixed(3),
      );
      const remainder =
        // Before division multiply the floats into integers. After,
        // divide back into a float that represents hours.
        Math.min((fixedBeginTimeHours * 1000) % (slotSizeInHours * 1000)) /
        1000;
      // Go to current slot's beginning.
      const currentSlotStartHour = fixedBeginTimeHours - remainder;
      const [hours, minutes] = getHoursAndMinutes(currentSlotStartHour);

      fixedBeginTime.setHours(hours);
      fixedBeginTime.setMinutes(minutes);

      const opens = new Date(resource.getIn(['opening_hours', 0, 'opens']));
      // eslint-disable-next-line no-unused-vars
      const closes = new Date(resource.getIn(['opening_hours', 0, 'closes']));

      // Begin from opening time.
      if (begin.getTime() < opens.getTime()) {
        begin = opens;
        fixedBeginTime = opens;
      }

      // Shortcut.
      const reservations = resource.get('reservations');

      // Check if current time is free.
      const currentReservations = reservations.filter(
        reservation =>
          new Date(reservation.get('begin')).getTime() < begin.getTime() &&
          new Date(reservation.get('end')).getTime() > begin.getTime(),
      );

      // Current time is not free. Cannot make new reservations.
      if (currentReservations.size > 0) {
        return [];
      }

      // Iterate upcoming four hours and add slots to list if duration exceeds min time limit.
      // eslint-disable-next-line no-plusplus
      for (let minute = 1; minute < 4 * 60; minute++) {
        // Create end time.
        const end = new Date(begin.getTime() + minute * 60 * 1000);

        // Check if the time is free.
        // eslint-disable-next-line no-shadow
        const currentReservations = reservations.filter(
          reservation =>
            new Date(reservation.get('begin')).getTime() < end.getTime() &&
            new Date(reservation.get('end')).getTime() > end.getTime(),
        );

        // Given end time is not available anymore. Quit.
        if (currentReservations.size > 0) {
          break;
        }

        // If current time is even minute and slot duration is long enough, add to list.
        if (
          (end.getMinutes() === 0 || end.getMinutes() === 30) &&
          end.getTime() - fixedBeginTime.getTime() >= minPeriodMilliseconds
        ) {
          freeSlots.push({ begin: fixedBeginTime, end });
        }
      }
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
