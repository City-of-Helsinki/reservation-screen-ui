import dateFormat from 'dateformat';
import request from 'utils/request';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_RESERVATIONS, MAKE_RESERVATION } from './constants';
import { makeSelectResourceId, makeSelectSelectedSlot } from './selectors';
import {
  loadReservations,
  resourceLoaded,
  resourceLoadingError,
  makeReservationCompleted,
  makeReservationError,
} from './actions';

/**
 * Load resource from API.
 */
export function* getReservations() {
  // By default use local file.
  let requestURL = '';

  if (window.location.toString().match(/resourceId=/)) {
    const resourceId = window.location
      .toString()
      .replace(/.*resourceId=/, '')
      .replace(/&.*/, '');

    // Start
    // ?start=2018-09-17T08%3A00%3A00%2B03%3A00&end=2018-09-17T20%3A00%3A00%2B03%3A00
    let start = new Date();
    let startTimeStr = encodeURIComponent(
      `${dateFormat(start, 'yyyy-mm-dd')}T00:00:00Z`,
    );
    let endTimeStr = encodeURIComponent(
      `${dateFormat(start, 'yyyy-mm-dd')}T23:59:59Z`,
    );

    // If id has "json" in it's name, use local file.
    if (resourceId.match(/\.json/)) {
      requestURL = `/api/${resourceId}`;
    } else {
      requestURL = `https://respa-admin.kontena.hel.ninja/v1/resource/${resourceId}/?start=${startTimeStr}&end=${endTimeStr}`;
    }
  }

  try {
    const resource = yield call(request, requestURL);
    yield put(resourceLoaded(resource));
  } catch (err) {
    yield put(resourceLoadingError(err));
  }
}

export function* makeReservation() {
  // Get resource id and selected slot.

  const resourceId = yield select(makeSelectResourceId());
  const currentSlot = yield select(makeSelectSelectedSlot());
  const requestURL = 'https://respa-admin.kontena.hel.ninja/v1/reservation/';

  // Expect date objects.
  if (
    typeof currentSlot.begin !== 'object' ||
    typeof currentSlot.end !== 'object'
  ) {
    return false;
  }

  // Data to send.
  const data = {
    begin: `${dateFormat(currentSlot.begin, 'yyyy-mm-dd')}T${dateFormat(
      currentSlot.begin,
      'HH:MM:ss.000o',
    )}`,
    end: `${dateFormat(currentSlot.end, 'yyyy-mm-dd')}T${dateFormat(
      currentSlot.end,
      'HH:MM:ss.000o',
    )}`,
    resource: resourceId,
  };

  // Do request.
  try {
    const reservation = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization:
          'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InUtbHNiaHNpZ2ZrYWk2cmh5aXlrczVwYTN1YXkiLCJlbWFpbCI6ImphYWtrb0BhbGFqb2tpLmZpIiwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsImRlcGFydG1lbnRfbmFtZSI6bnVsbCwiaXNzIjoiaHR0cHM6Ly9hcGkuaGVsLmZpL3NzbyIsInN1YiI6IjVjODUxNTJjLWM1NTAtMTFlOC05ZjA4LWMyYTVkNzgzNzQwNiIsImF1ZCI6ImJ4N0ZxRzk1ZnZ4dEtnSkRCd3RsZGlTTGU4QTJoU0J6RTlJT2l5dFciLCJleHAiOjE1NDA5MTg2ODh9.Eb-PFYe4lS6cXgPgtFQIjqbGBPUfvkZEoPXv-2__fLE',
      },
      body: JSON.stringify(data),
    });
    yield put(makeReservationCompleted(reservation));
    yield put(loadReservations());
  } catch (err) {
    yield put(makeReservationError(err));
  }
}

/**
 * Root saga.
 */
export default function* reservationData() {
  yield all([
    takeLatest(LOAD_RESERVATIONS, getReservations),
    takeLatest(MAKE_RESERVATION, makeReservation),
  ]);
}
