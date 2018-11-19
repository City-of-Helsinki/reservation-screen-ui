import dateFormat from 'dateformat';
import request from 'utils/request';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_RESERVATIONS, MAKE_RESERVATION } from './constants';
import { makeSelectResourceId, makeSelectSelectedSlot } from './selectors';
import {
  setupRequired,
  loadReservations,
  resourceLoaded,
  resourceLoadingError,
  makeReservationCompleted,
  makeReservationError,
} from './actions';

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
    staging = window.location
      .toString()
      .replace(/.*staging=/, '')
      .replace(/&.*/, '');
  }

  // Start
  // ?start=2018-09-17T08%3A00%3A00%2B03%3A00&end=2018-09-17T20%3A00%3A00%2B03%3A00
  let start = new Date();
  let startTimeStr = encodeURIComponent(
    `${dateFormat(start, 'yyyy-mm-dd')}T00:00:00Z`,
  );
  let endTimeStr = encodeURIComponent(
    `${dateFormat(start, 'yyyy-mm-dd')}T23:59:59Z`,
  );

  if (!resourceId || !token) {
    yield put(setupRequired());
    return;
  }

  // If id has "json" in it's name, use local file.
  if (resourceId.match(/\.json/)) {
    requestURL = `/api/${resourceId}`;
  } else {
    if (staging) {
      requestURL = `https://api.hel.fi/respa-test/v1/resource/${resourceId}/?start=${startTimeStr}&end=${endTimeStr}`;
    } else {
      requestURL = `https://api.hel.fi/respa-test/v1/resource/${resourceId}/?start=${startTimeStr}&end=${endTimeStr}`;
    }
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

export function* makeReservation() {
  // Get resource id and selected slot.
  const resourceId = yield select(makeSelectResourceId());
  const currentSlot = yield select(makeSelectSelectedSlot());

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
    requestURL = 'https://api.hel.fi/respa-test/v1/reservation/';
  } else {
    requestURL = 'https://api.hel.fi/respa-test/v1/reservation/';
  }

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
    event_description: 'Anonymous reservation',
    reserver_address_city: 'Helsinki',
    reserver_address_zip: '00100',
    reserver_address_street: 'Helsinki',
    reserver_email_address: 'info@oodihelsinki.fi',
    reserver_phone_number: '123456789',
    reserver_name: 'Anonymous reserver',
    reserver_id: 'anonymous',
  };

  // Do request.
  try {
    const reservation = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    yield put(makeReservationCompleted(reservation));
    yield put(loadReservations());
  } catch (err) {
    console.log(err);
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
