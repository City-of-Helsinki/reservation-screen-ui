import {
  CHANGE_USERNAME,
  LOAD_RESERVATIONS,
  LOAD_RESERVATIONS_SUCCESS,
  LOAD_RESERVATIONS_ERROR,
} from './constants';

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
