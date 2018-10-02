/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { fromJS } from 'immutable';

// Home state from store.
const selectHome = state => state.get('home', initialState);

/**
 * Select list of free slots.
 */
const makeFreeSlots = () =>
  createSelector(selectHome, state => state.get('reservations'));

/**
 * Select all upcoming reservations.
 */
const makeUpcomingReservations = amount =>
  createSelector(selectHome, state => {
    // Start by getting resource from store.
    const resource = state.get('resource');
    const date = state.get('date');

    // Continue only if resource exists and has reservations.
    if (resource && resource.has('reservations')) {
      // Get list of upcoming reservations.
      const futureReservations = resource
        .get('reservations')
        .filter(
          reservation =>
            new Date(reservation.get('end')).getTime() > date.getTime(),
        );

      // Slice the amount we wanted.
      return futureReservations.slice(0, amount);
    }
    return fromJS([]);
  });

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

    // Get opening times.
    const opens = new Date(resource.getIn(['opening_hours', 0, 'opens']));
    const closes = new Date(resource.getIn(['opening_hours', 0, 'closes']));

    // Get current time.
    const currentTime = state.get('date');

    // Continue if we have reservations.
    if (resource.has('reservations') && resource.get('reservations').size > 0) {
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
      // If resource is still closed, next available time is when resource opens.
      return new Date(closes);
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
    if (resource.has('reservations') && resource.get('reservations').size > 0) {
      // Just a shortcut here...
      const reservations = resource.get('reservations');

      // First test if resource is free on opening time. If free, add to list.
      if (opens != reservations.getIn([0, 'begin'])) {
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
          reservation.get('end') != nextReservation.get('begin')
        ) {
          freeSlots.push(new Date(reservation.get('end')));
        }
      }
    }
    // No reservations so next available time is when the resource is open.
    else {
      // If resource is still closed, next available time is when resource opens.
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

    return nextAvailableTime ? nextAvailableTime : false;
  });

/**
 * Select resource name.
 */
const makeSelectResourceName = () =>
  createSelector(selectHome, state => state.getIn(['resource', 'name', 'fi']));

/**
 * Return true is the space is open right now.
 */
const makeSelectIsResourceAvailable = () =>
  createSelector(selectHome, state => {
    // Start by getting resource from store.
    const resource = state.get('resource');
    const date = state.get('date');

    // Continue only if resource exists and has reservations.
    if (resource && resource.has('reservations')) {
      // Get list of current.
      const currentReservations = resource
        .get('reservations')
        .filter(
          reservation =>
            new Date(reservation.get('begin')).getTime() < date.getTime() &&
            new Date(reservation.get('end')).getTime() > date.getTime(),
        );

      return !(currentReservations.size > 0);
    }
    return false;
  });

const makeSelectScene = () =>
  createSelector(selectHome, homeState => homeState.get('scene'));

const makeSelectDate = () =>
  createSelector(selectHome, homeState => {
    return homeState.get('date');
  });

export {
  selectHome,
  makeFreeSlots,
  makeUpcomingReservations,
  makeSelectResourceName,
  makeSelectIsResourceAvailable,
  makeSelectDate,
  makeSelectScene,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
};
