import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_RESERVATIONS } from './constants';
import { resourceLoaded, resourceLoadingError } from './actions';

/**
 * Load resource from API.
 */
export function* getReservations() {
  const requestURL = `/api/resources.json`;

  try {
    const resource = yield call(request, requestURL);
    yield put(resourceLoaded(resource));
  } catch (err) {
    yield put(resourceLoadingError(err));
  }
}

/**
 * Root saga.
 */
export default function* reservationData() {
  yield takeLatest(LOAD_RESERVATIONS, getReservations);
}
