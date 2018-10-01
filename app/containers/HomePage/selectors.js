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
const makeUpcomingReservations = (date, amount) =>
  createSelector(selectHome, state => {
    // Start by getting resource from store.
    const resource = state.get('resource');

    // Continue only if resource exists and has reservations.
    if (resource && resource.has('reservations')) {
      // Get list of upcoming reservations.
      const futureReservations = resource
        .get('reservations')
        .filter(
          reservation =>
            new Date(reservation.get('begin')).getTime() > date.getTime(),
        );

      // Slice the amount we wanted.
      return futureReservations.slice(0, amount);
    }
    return fromJS([]);
  });

/**
 * Select resource name.
 */
const makeSelectResourceName = () =>
  createSelector(selectHome, state => state.getIn(['resource', 'name', 'fi']));

/**
 * Return true is the space is open right now.
 */
const makeSelectIsResourceFree = date =>
  createSelector(selectHome, state => {
    // Start by getting resource from store.
    const resource = state.get('resource');

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

      // Slice the amount we wanted.
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
  makeSelectIsResourceFree,
  makeSelectDate,
  makeSelectScene,
};
