/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
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

    // Continue if we have reservations.
    if (
      resource.has('reservations') &&
      resource.get('reservations') &&
      resource.get('reservations').size > 0
    ) {
      // Just a shortcut here...
      const reservations = resource.get('reservations');

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
    }
    // No resevations at all. Next resource is available until closing time.
    else {
      // Get opening times.
      const closes = resource.getIn(['opening_hours', 0, 'closes']);

      // Space is available until closing time.
      if (closes) {
        return new Date(closes);
      }
      // Closing time not available. Default to 22.00.

      const newCloses = new Date();
      newCloses.setHours(22);
      newCloses.setMinutes(0);
      newCloses.setSeconds(0);
      return newCloses;
    }

    return false;
  });

/**
 * Find time when the resource is available next.
 */
const makeSelectNextAvailableTime = () =>
  createSelector(selectHome, state => {
    // Get resource.
    const resource = state.get('resource');

    if (!resource) {
      return false;
    }

    // Get opening times.
    const opens = new Date(resource.getIn(['opening_hours', 0, 'opens']));
    const closes = new Date(resource.getIn(['opening_hours', 0, 'closes']));

    // Get current time.
    const currentTime = state.get('date');

    // List of free slots for the day.
    const freeSlots = [];

    // Continue if we have reservations.
    if (
      resource.has('reservations') &&
      resource.get('reservations') &&
      resource.get('reservations').size > 0
    ) {
      // Just a shortcut here...
      const reservations = resource.get('reservations');

      // First test if resource is free on opening time. If free, add to list.
      if (opens !== reservations.getIn([0, 'begin'])) {
        freeSlots.push(new Date(opens));
      }

      // If space is free, add current time to list
      const currentReservation = reservations.find(
        reservation =>
          new Date(reservation.get('begin')).getTime() <=
            currentTime.getTime() &&
          new Date(reservation.get('end')).getTime() >= currentTime.getTime(),
      );
      if (!currentReservation) {
        freeSlots.push(currentTime);
      }

      // Loop through all reservations. Compare reservation's end time
      // to next reservation's start time. If times differs there's
      // a free slot!
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < reservations.size; i++) {
        // Shortcuts.
        const reservation = reservations.get(i);
        const nextReservation =
          i + 1 < reservations.size ? reservations.get(i + 1) : false;

        // There is free time after current reservation, if:
        //
        // 1. There is no next reservation
        // 2. The next reservation doesn't start immediately.
        if (
          !nextReservation ||
          reservation.get('end') !== nextReservation.get('begin')
        ) {
          freeSlots.push(new Date(reservation.get('end')));
        }
      }
    }
    // No reservations so next available time is when the resource is open.
    else {
      // If resource is still closed, next available time is when resource opens.
      // eslint-disable-next-line no-lonely-if
      if (currentTime < opens.getTime()) {
        freeSlots.push(new Date(opens));
      }
      // Otherwise next available time is immediately.
      else {
        freeSlots.push(currentTime);
      }
    }

    // Find next free slot. Should be in the future before closing time.
    const nextAvailableTime = freeSlots.find(
      freeSlot =>
        freeSlot.getTime() >= currentTime &&
        freeSlot.getTime() < closes.getTime(),
    );

    return nextAvailableTime || false;
  });

/**
 * Select resource name.
 */
const makeSelectResourceName = () =>
  createSelector(selectHome, state => state.getIn(['resource', 'name', 'fi']));

const makeSelectResourceId = () =>
  createSelector(selectHome, state => state.getIn(['resource', 'id']));

const makeSelectResourcePeopleCapacity = () =>
  createSelector(selectHome, state =>
    state.getIn(['resource', 'people_capacity']),
  );

const makeSelectResourceMaxPeriod = () =>
  createSelector(selectHome, state => state.getIn(['resource', 'max_period']));

/**
 *Select resource description
 */
const makeSelectResourceDescription = () =>
  createSelector(selectHome, state => {
    let description = state.getIn(['resource', 'description', 'fi']);
    if (description) {
      description = description.replace(/\n/, '<br /><br />');
      return description;
    }
    return '';
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

/**
 * Get list of free slots. I'm not proud of this implementation. If someone has better ideas feel free to fix :)
 */
const makeSelectFreeSlots = amount =>
  createSelector(selectHome, state => {
    // Get variables from state.
    const resource = state.get('resource');
    const minPeriod = state.getIn(['resource', 'min_period']);
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
    if (fixedBeginTime.getMinutes() >= 30) {
      fixedBeginTime.setMinutes(30);
    } else {
      fixedBeginTime.setMinutes(0);
    }

    if (resource) {
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
  createSelector(selectHome, state => state.get('resource'));

export {
  selectHome,
  makeSelectResource,
  makeSelectResourceId,
  makeSelectResourceName,
  makeSelectResourceDescription,
  makeSelectResourcePeopleCapacity,
  makeSelectResourceMaxPeriod,
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
