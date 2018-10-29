import dateFormat from 'dateformat';
import request from 'utils/request';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_RESERVATIONS, MAKE_RESERVATION } from './constants';
import { makeSelectResourceId, makeSelectSelectedSlot } from './selectors';
import {
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

    console.log(resourceId);

    // If id has "json" in it's name, use local file.
    if (resourceId.match(/\.json/)) {
      requestURL = `/api/${resourceId}`;
    } else {
      requestURL = `https://respa-admin.kontena.hel.ninja/v1/resource/${resourceId}/`;
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
      'HH:MM:ss.000',
    )}Z`,
    end: `${dateFormat(currentSlot.end, 'yyyy-mm-dd')}T${dateFormat(
      currentSlot.end,
      'HH:MM:ss.000',
    )}Z`,
    resource: resourceId,
  };

  // Do request.
  try {
    const reservation = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization:
          'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InUtbHNiaHNpZ2ZrYWk2cmh5aXlrczVwYTN1YXkiLCJlbWFpbCI6ImphYWtrb0BhbGFqb2tpLmZpIiwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsImRlcGFydG1lbnRfbmFtZSI6bnVsbCwiaXNzIjoiaHR0cHM6Ly9hcGkuaGVsLmZpL3NzbyIsInN1YiI6IjVjODUxNTJjLWM1NTAtMTFlOC05ZjA4LWMyYTVkNzgzNzQwNiIsImF1ZCI6ImJ4N0ZxRzk1ZnZ4dEtnSkRCd3RsZGlTTGU4QTJoU0J6RTlJT2l5dFciLCJleHAiOjE1NDA4NDU4MjV9.VJDOGtyLIj797KLj-xNK9XErsKVC_ELKSSDZVN87MjM',
      },
      body: JSON.stringify(data),
    });
    yield put(makeReservationCompleted(reservation));
  } catch (err) {
    yield put(makeReservationError(err));
  }
}

function log(effect, message) {
  console.log(message);
  return effect;
}

/**
 * Root saga.
 */
export default function* reservationData() {
  yield all([
    log(takeLatest(LOAD_RESERVATIONS, getReservations)),
    log(takeLatest(MAKE_RESERVATION, makeReservation)),
  ]);
}
