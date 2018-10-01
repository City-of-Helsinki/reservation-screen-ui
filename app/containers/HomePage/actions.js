import {
  CHANGE_USERNAME,
  INIT_CLOCK,
  LOAD_RESERVATIONS,
  LOAD_RESERVATIONS_SUCCESS,
  LOAD_RESERVATIONS_ERROR,
  CHANGE_SCENE,
} from './constants';

export function initClock(date) {
  return {
    type: INIT_CLOCK,
    date,
  };
}

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
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
