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
const makeUpcomingReservations = date =>
  createSelector(selectHome, state => {
    let resource = state.get('resource');
    if (resource && resource.has('reservations')) {
      return resource.get('reservations').toArray();
    } else {
      return [];
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
