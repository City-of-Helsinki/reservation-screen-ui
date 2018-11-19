import {
  SETUP_REQUIRED,
  UPDATE_CLOCK,
  LOAD_RESERVATIONS,
  LOAD_RESERVATIONS_SUCCESS,
  LOAD_RESERVATIONS_ERROR,
  CHANGE_SCENE,
  CHANGE_SLOT,
  TOGGLE_DESCRIPTION_OPEN,
  MAKE_RESERVATION,
  MAKE_RESERVATION_COMPLETED,
  MAKE_RESERVATION_ERROR,
} from './constants';

export function setupRequired() {
  return {
    type: SETUP_REQUIRED,
  };
}

export function updateClock(date) {
  return {
    type: UPDATE_CLOCK,
    date,
  };
}

export function toggleIsDescriptionOpen() {
  return {
    type: TOGGLE_DESCRIPTION_OPEN,
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
  return {
    type: MAKE_RESERVATION_COMPLETED,
    reservation,
  };
}

export function makeReservationError(error) {
  console.log(error);
  return {
    type: MAKE_RESERVATION_ERROR,
    error,
  };
}
