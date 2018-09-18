/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

// const selectHome = state => state.get('home');

const selectHome = state => state.get('home', initialState);

const makeFreeSlots = () =>
  createSelector(selectHome, state => state.get('reservations'));

const makeUpcomingReservations = () =>
  createSelector(selectHome, state => {
    let resource = state.get('resource');
    if (resource && resource.reservations) {
      return resource.reservations;
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
