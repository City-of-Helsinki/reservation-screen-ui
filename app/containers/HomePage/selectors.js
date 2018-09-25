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
const makeFreeSlots = () =>
  createSelector(selectHome, state => state.get('reservations'));

/**
 * Select all upcoming reservations.
 */
const makeUpcomingReservations = (date, amount) =>
  createSelector(selectHome, state => {
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

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

export {
  selectHome,
  makeSelectUsername,
  makeFreeSlots,
  makeUpcomingReservations,
};
