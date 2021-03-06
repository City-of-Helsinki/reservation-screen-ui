import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import moment from 'moment';

import { DATE_FORMAT } from './calendarConstants';

/**
 * getOpeningHours();
 * @param resource {object} Resource object.
 * @param date Date string that can be parsed as moment object.
 * @returns {null|{opens: *, closes: *}}
 */
const getOpeningHours = (resource, date = null) => {
  if (!resource) {
    return null;
  }

  const openingHours = get(resource, 'opening_hours', []);
  if (!openingHours.length) {
    return null;
  }

  const index = date
    ? findIndex(
        openingHours,
        item => item.date === moment(date).format('YYYY-MM-DD'),
      )
    : 0;
  return {
    closes: get(openingHours, `[${index}].closes`),
    opens: get(openingHours, `[${index}].opens`),
  };
};

/**
 * getOpeningHoursForWeek();
 * @param resource
 * @param date Date string that can be parsed as moment object.
 * @returns {[]}
 */
const getOpeningHoursForWeek = (resource, date = null) => {
  let momentDate = moment(date).startOf('week');

  const openingHours = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    openingHours.push({
      date: momentDate.toISOString(),
      ...getOpeningHours(resource, momentDate.toISOString()),
    });
    momentDate = momentDate.add(1, 'day');
  }

  return openingHours;
};

/**
 * getFullCalendarBusinessHours();
 * @param resource
 * @param date Date string that can be parsed as moment object.
 * @returns {[]}
 */
export const getFullCalendarBusinessHours = (resource, date = null) => {
  const openingHours = getOpeningHoursForWeek(resource, date);
  const businessHours = [];

  openingHours.forEach(item => {
    if (item) {
      const dayNumber = Number(moment(item.date).format('E'));
      businessHours.push({
        daysOfWeek: [dayNumber < 7 ? dayNumber : 0],
        startTime: item.opens ? moment(item.opens).format('HH:mm') : '00:00',
        endTime: item.closes ? moment(item.closes).format('HH:mm') : '00:00',
      });
    }
  });

  return businessHours;
};

/**
 * getFullCalendarMinTime();
 * @param resource {object}
 * @param date {string} Date string that can be parsed as moment object.
 * @param viewType {string} Type of a FullCalendar View Object (https://fullcalendar.io/docs/view-object).
 * @returns {string}
 */
export const getFullCalendarMinTime = (resource, date, viewType) => {
  const defaultMin = '07:00:00';
  let openingHours = null;
  switch (viewType) {
    case 'timeGridDay':
      openingHours = [getOpeningHours(resource, date)];
      break;
    case 'timeGridWeek':
      openingHours = getOpeningHoursForWeek(resource, date);
      break;
    default:
      openingHours = null;
  }

  if (!openingHours) {
    return defaultMin;
  }

  const earliestOpeningTime = openingHours.reduce((incumbent, item) => {
    if (item === null || item.opens === null) {
      return incumbent;
    }

    const opens = moment(item.opens);

    if (incumbent === undefined) {
      return opens;
    }

    const incumbentTimeSinceStartOfDay =
      incumbent.valueOf() -
      incumbent
        .clone()
        .startOf('day')
        .valueOf();
    const openTimeSinceStartOfDay =
      opens.valueOf() -
      opens
        .clone()
        .startOf('day')
        .valueOf();

    if (openTimeSinceStartOfDay < incumbentTimeSinceStartOfDay) {
      return opens;
    }

    return incumbent;
  }, undefined);

  if (earliestOpeningTime) {
    return earliestOpeningTime.format('HH:mm:ss');
  }

  return defaultMin;
};

/**
 * getFullCalendarMaxTime();
 * @param resource {object}
 * @param date {string} Date string that can be parsed as moment object.
 * @param viewType {string} Type of a FullCalendar View Object (https://fullcalendar.io/docs/view-object).
 * @returns {string}
 */
export const getFullCalendarMaxTime = (resource, date, viewType) => {
  const defaultMax = '17:00:00';
  let openingHours = null;
  switch (viewType) {
    case 'timeGridDay':
      openingHours = [getOpeningHours(resource, date)];
      break;
    case 'timeGridWeek':
      openingHours = getOpeningHoursForWeek(resource, date);
      break;
    default:
      openingHours = null;
  }

  if (!openingHours) {
    return defaultMax;
  }

  const latestClosingTime = openingHours.reduce((incumbent, item) => {
    if (item === null || item.closes === null) {
      return incumbent;
    }

    const closes = moment(item.closes);

    if (incumbent === undefined) {
      return closes;
    }

    const incumbentTimeSinceStartOfDay =
      incumbent.valueOf() -
      incumbent
        .clone()
        .startOf('day')
        .valueOf();
    const closeTimeSinceStartOfDay =
      closes.valueOf() -
      closes
        .clone()
        .startOf('day')
        .valueOf();

    if (closeTimeSinceStartOfDay > incumbentTimeSinceStartOfDay) {
      return closes;
    }

    return incumbent;
  }, undefined);

  if (latestClosingTime) {
    return latestClosingTime.format('HH:mm:ss');
  }

  return defaultMax;
};

/**
 * getFullCalendarSlotLabelInterval();
 * @param resource {object} Resource object.
 * @returns {string}
 */
export const getFullCalendarSlotLabelInterval = resource => {
  const slotSize = get(resource, 'slot_size', null);

  if (slotSize === '00:15:00') {
    return '00:30:00';
  }

  return '01:00:00';
};

/**
 * isDateReservable();
 * @param resource {object} Resource object from the API.
 * @param date {string} Date string that can be parsed as moment object.
 * @returns {boolean}
 */
export const isDateReservable = (resource, date) => {
  if (!resource || !date) {
    return false;
  }

  const reservableAfter = get(resource, 'reservable_after', null);
  const reservableBefore = get(resource, 'reservable_before', null);

  const isAdmin = get(resource, 'user_permissions.is_admin', false);
  const isBefore = reservableBefore
    ? moment(date, DATE_FORMAT).isSameOrBefore(moment(reservableBefore), 'day')
    : true;
  const isAfter = reservableAfter
    ? moment(date, DATE_FORMAT).isSameOrAfter(moment(reservableAfter), 'day')
    : true;

  return isAdmin || (isBefore && isAfter);
};
