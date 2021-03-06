import dateFormat from 'dateformat';
import request from 'utils/request';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import moment from 'moment';
import { LOAD_RESERVATIONS, MAKE_RESERVATION } from './constants';
import {
  changeScene,
  setupRequired,
  loadReservations,
  resourceLoaded,
  resourceLoadingError,
  makeReservationCompleted,
  makeReservationError,
} from './actions';

function getCurrentWeekStartEnd() {
  const now = moment();
  const start = now
    .clone()
    .startOf('isoWeek')
    .toDate();
  const end = now
    .clone()
    .endOf('isoWeek')
    .toDate();

  return [start, end];
}

// TODO: Currently url request parameters are read in this saga. This is not a good practice.
// Get parameter handling should be done before entering the app.
// For example app/index.js before bootstrapping the app.

/**
 * Load resource from API.
 */
export function* getReservations() {
  // By default use local file.
  let requestURL = '';
  let resourceId = false;
  let token = false;
  let staging = false;

  if (window.location.toString().match(/resourceId=/)) {
    resourceId = window.location
      .toString()
      .replace(/.*resourceId=/, '')
      .replace(/&.*/, '');
  }

  if (window.location.toString().match(/token=/)) {
    token = window.location
      .toString()
      .replace(/.*token=/, '')
      .replace(/&.*/, '');
  }

  if (window.location.toString().match(/staging=/)) {
    staging = true;
  }

  // Start
  // ?start=2018-09-17T08%3A00%3A00%2B03%3A00&end=2018-09-17T20%3A00%3A00%2B03%3A00
  // The calendar where we show events has a day and a week view.
  // Because the difference in the request is negligible, we just always
  // request all the events for the current week.
  const [start, end] = getCurrentWeekStartEnd();
  const startTimeStr = encodeURIComponent(
    `${dateFormat(start, 'yyyy-mm-dd')}T00:00:00Z`,
  );
  const endTimeStr = encodeURIComponent(
    `${dateFormat(end, 'yyyy-mm-dd')}T23:59:59Z`,
  );

  if (!resourceId || !token) {
    yield put(setupRequired());
    return;
  }

  // If id has "json" in it's name, use local file.
  if (resourceId.match(/\.json/)) {
    requestURL = `/api/${resourceId}`;
  } else if (staging) {
    requestURL = `https://respa.koe.hel.ninja/v1/resource/${resourceId}/?start=${startTimeStr}&end=${endTimeStr}`;
  } else {
    requestURL = `https://api.hel.fi/respa/v1/resource/${resourceId}/?start=${startTimeStr}&end=${endTimeStr}`;
  }

  try {
    const resource = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${token}`,
      },
    });
    yield put(resourceLoaded(resource));
  } catch (err) {
    yield put(resourceLoadingError(err));
  }
}

// eslint-disable-next-line consistent-return
export function* makeReservation(action) {
  const { reservation } = action;

  if (!reservation) {
    return false;
  }

  let requestURL = '';
  let staging = false;
  let token = false;

  if (window.location.toString().match(/token=/)) {
    token = window.location
      .toString()
      .replace(/.*token=/, '')
      .replace(/&.*/, '');
  }

  if (window.location.toString().match(/staging=/)) {
    staging = window.location
      .toString()
      .replace(/.*staging=/, '')
      .replace(/&.*/, '');
  }

  if (staging) {
    requestURL = 'https://respa.koe.hel.ninja/v1/reservation/';
  } else {
    requestURL = 'https://api.hel.fi/respa/v1/reservation/';
  }

  // Show loading screen.
  yield put(changeScene('Loading'));

  // Do request.
  try {
    const createdReservation = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(reservation.toJS()),
    });
    yield put(makeReservationCompleted(createdReservation));
    yield put(loadReservations());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-console
    console.log(err.message);
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
