import {
  CHANGE_USERNAME,
  UPDATE_CLOCK,
  LOAD_RESERVATIONS,
  LOAD_RESERVATIONS_SUCCESS,
  LOAD_RESERVATIONS_ERROR,
  CHANGE_SCENE,
  CHANGE_SLOT,
  MAKE_RESERVATION,
  MAKE_RESERVATION_COMPLETED,
  MAKE_RESERVATION_ERROR,
} from './constants';

export function updateClock(date) {
  return {
    type: UPDATE_CLOCK,
    date,
  };
}

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function changeSlot(selectedSlot) {
  return {
    type: CHANGE_SLOT,
    selectedSlot,
  };
}

export function loadReservations() {
  return {
    type: LOAD_RESERVATIONS,
  };
}

export function changeScene(scene) {
  return {
    type: CHANGE_SCENE,
    scene,
  };
}

export function resourceLoaded(resource) {
  return {
    type: LOAD_RESERVATIONS_SUCCESS,
    resource,
  };
}

export function resourceLoadingError(error) {
  return {
    type: LOAD_RESERVATIONS_ERROR,
    error,
  };
}

export function makeReservation() {
  return {
    type: MAKE_RESERVATION,
  };
}

export function makeReservationCompleted(reservation) {
  console.log('lol');
  return {
    type: MAKE_RESERVATION_COMPLETED,
    reservation,
  };
}

export function makeReservationError(error) {
  console.log('vituiiiks');
  return {
    type: MAKE_RESERVATION_ERROR,
    error,
  };
}
