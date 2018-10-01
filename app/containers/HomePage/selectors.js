/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { fromJS } from 'immutable';

// Home state from store.
const selectHome = state => {
  if (state) {
    state.get('home', initialState);
  }
};

/**
 * Select list of free slots.
 */
const makeFreeSlots = () =>
  createSelector(selectHome, state => {
    if (state) {
      return state.get('reservations');
    }
  });

/**
 * Select all upcoming reservations.
 */
const makeUpcomingReservations = (date, amount) =>
  createSelector(selectHome, state => {
    if (!state) {
      return fromJS([]);
    }

    // Start by getting resource from store.
    const resource = state.get('resource');

    // Continue only if resource exists and has reservations.
    if (resource && resource.has('reservations')) {
      // Get list of upcoming reservations.
      const futureReservations = resource
        .get('reservations')
        .filter(reservation => {
          return new Date(reservation.get('begin')).getTime() > date.getTime();
        });

      // Slice the amount we wanted.
      return futureReservations.slice(0, amount);
    } else {
      return fromJS([]);
    }
  });

/**
 * Select resource name.
 */
const makeSelectResourceName = () =>
  createSelector(selectHome, state => {
    if (state) {
      return state
        .get('resource')
        .get('name')
        .get('fi');
    } else {
      return 'N/A';
    }
  });

/**
 * Return true is the space is open right now.
 */
const makeSelectIsResourceFree = date =>
  createSelector(selectHome, state => {
    if (!state) {
      return true;
    }

    // Start by getting resource from store.
    const resource = state.get('resource');

    // Continue only if resource exists and has reservations.
    if (resource && resource.has('reservations')) {
      // Get list of current.
      const currentReservations = resource
        .get('reservations')
        .filter(reservation => {
          return (
            new Date(reservation.get('begin')).getTime() < date.getTime() &&
            new Date(reservation.get('end')).getTime() > date.getTime()
          );
        });

      // Slice the amount we wanted.
      return currentReservations.size > 0 ? false : true;
    } else {
      return false;
    }
  });

export {
  selectHome,
  makeFreeSlots,
  makeUpcomingReservations,
  makeSelectResourceName,
  makeSelectIsResourceFree,
};
