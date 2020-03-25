import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import PropTypes from 'prop-types';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import interactionPlugin from '@fullcalendar/interaction';
import enLocale from '@fullcalendar/core/locales/en-gb';
import svLocale from '@fullcalendar/core/locales/sv';
import fiLocale from '@fullcalendar/core/locales/fi';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import moment from 'moment';
import 'moment-timezone';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { injectIntl } from 'react-intl';

import CalendarLegend from './legend/CalendarLegend';
import {
  isDateReservable,
  getFullCalendarBusinessHours,
  getFullCalendarMaxTime,
  getFullCalendarMinTime,
  getFullCalendarSlotLabelInterval,
} from './resourceUtils';
import CalendarStyleOverrides from './CalendarStyleOverrides';
import {
  TIME_ZONE,
  DATE_FORMAT,
  DEFAULT_CALENDAR_VIEW,
} from './calendarConstants';

const ONE_HOUR_IN_MS = 3600000;
const TIME_GRID_DAY = 'timeGridDay';
const TIME_GRID_WEEK = 'timeGridWeek';
const CUSTOM_TIME_GRID_DAY_BUTTON = 'customTimeGridDayButton';
const CUSTOM_TIME_GRID_WEEK_BUTTON = 'customTimeGridWeekButton';

moment.tz.setDefault(TIME_ZONE);
// Re-apply moment-timezone default timezone, cause FullCalendar import have override the import

class TimePickerCalendar extends Component {
  calendarRef = React.createRef();
  timer = null;

  static propTypes = {
    date: PropTypes.string,
    height: PropTypes.number,
    intl: PropTypes.object.isRequired,
    onViewTypeChange: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
    reservationBeingCreated: PropTypes.object,
  };

  get calendarApi() {
    if (!this.calendarRef.current) {
      return null;
    }

    return this.calendarRef.current.getApi();
  }

  get viewType() {
    if (!this.calendarApi) {
      // When the calendar has not loaded, the value is mocked to be the
      // default value, because that's the next expected value.
      return DEFAULT_CALENDAR_VIEW;
    }

    return this.calendarApi.view.type;
  }

  componentDidMount() {
    // Scroll calendar to current time when mounted.
    this.handleScrollCalendarToCurrentTime();

    // And scroll again after each passing hour.
    this.timer = setInterval(
      () => this.handleScrollCalendarToCurrentTime(),
      ONE_HOUR_IN_MS,
    );

    // Set the button representing the initially activated view as
    // active.
    this.handleCustomButtonActiveState(DEFAULT_CALENDAR_VIEW);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps) {
    const { date } = this.props;

    if (date !== prevProps.date) {
      this.calendarApi.gotoDate(date);
    }

    // Set the button representing the currently activated view as
    // active.
    this.handleCustomButtonActiveState(this.viewType);
  }

  setViewType(viewType) {
    this.calendarApi.changeView(viewType);
    this.props.onViewTypeChange(viewType);
    this.handleScrollCalendarToCurrentTime();
  }

  getDurationText = selected => {
    const { resource } = this.props;
    const start = moment(selected.start);
    const end = moment(selected.end);
    const duration = moment.duration(end.diff(start));

    let maxDurationText = '';

    if (resource.max_period) {
      const maxDuration = get(resource, 'max_period', null);
      const maxDurationSeconds = moment.duration(maxDuration).asSeconds();
      maxDurationText = `, max ${maxDurationSeconds / 3600}h`;
    }

    return `${duration / 3600000}h${maxDurationText}`;
  };

  getReservedEvents = () => {
    const { resource, date, reservationBeingCreated } = this.props;

    // Add the resources reservations as normal FullCalendar events.
    const realReservations = get(resource, 'reservations', []);
    const reservations = reservationBeingCreated
      ? [...realReservations, reservationBeingCreated]
      : realReservations;
    const events = isEmpty(reservations)
      ? []
      : reservations.map(reservation => ({
          classNames: reservation.id
            ? 'app-TimePickerCalendar__event'
            : 'app-TimePickerCalendar__event--unconfirmed',
          editable: false,
          id: reservation.id,
          start: moment(reservation.begin).toDate(),
          end: moment(reservation.end).toDate(),
          title: reservation.event_subject,
        }));

    // Check resources reservation rules and disable days if needed.
    const now = moment();
    const momentDate = moment(date).startOf('week');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      if (
        momentDate.isBefore(now, 'date') ||
        !isDateReservable(resource, momentDate.format(DATE_FORMAT))
      ) {
        events.push({
          allDay: true,
          classNames: [
            'app-TimePickerCalendar__backgroundEvent',
            'app-TimePickerCalendar__restrictedDate',
          ],
          id: momentDate.format(DATE_FORMAT),
          start: momentDate.toDate(),
          end: momentDate.toDate(),
          rendering: 'background',
        });
      }
      momentDate.add(1, 'day');
    }

    return events;
  };

  getCalendarOptions = () => {
    const { intl } = this.props;

    return {
      allDaySlot: false,
      timeZone: TIME_ZONE,
      height: this.props.height || 'auto',
      editable: false,
      eventConstraint: 'businessHours',
      eventOverlap: false,
      firstDay: 1,
      locale: this.props.intl.locale,
      locales: [enLocale, svLocale, fiLocale],
      nowIndicator: true,
      plugins: [timeGridPlugin, momentTimezonePlugin, interactionPlugin],
      selectable: false,
      selectOverlap: false,
      selectConstraint: 'businessHours',
      selectMirror: true,
      dragScroll: true,
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short',
      },
      slotDuration: '00:15:00',
      unselectAuto: false,
      longPressDelay: 250,
      eventLongPressDelay: 20,
      selectLongPressDelay: 200,
      // Almost invoke click event on mobile immediately without any delay
      defaultView: DEFAULT_CALENDAR_VIEW,
      // Declare custom buttons for setting viewType to that we can hook
      // into the change event. When viewType changes, we send the new
      // viewType to the parent component. We also render the content of
      // the component differently based on current view.
      customButtons: {
        [CUSTOM_TIME_GRID_DAY_BUTTON]: {
          text: intl.formatMessage({ id: 'Calendar.dayViewLabel' }),
          click: () => {
            this.setViewType(TIME_GRID_DAY);
          },
        },
        [CUSTOM_TIME_GRID_WEEK_BUTTON]: {
          text: intl.formatMessage({ id: 'Calendar.weekViewLabel' }),
          click: () => {
            this.setViewType(TIME_GRID_WEEK);
          },
        },
      },
      header: {
        left: '',
        center: `${CUSTOM_TIME_GRID_DAY_BUTTON}, ${CUSTOM_TIME_GRID_WEEK_BUTTON}`,
        right: '',
      },
    };
  };

  getEvents = () => this.getReservedEvents();

  handleCustomButtonActiveState = viewType => {
    const activeClass = 'fc-button-active';
    const dayButtonSelector = `.fc-${CUSTOM_TIME_GRID_DAY_BUTTON}-button`;
    const weekButtonSelector = `.fc-${CUSTOM_TIME_GRID_WEEK_BUTTON}-button`;
    const dayButton = document.querySelector(dayButtonSelector);
    const weekButton = document.querySelector(weekButtonSelector);

    // If either of the buttons hasn't rendered yet, skip this
    // procedure.
    if (dayButton === null || weekButton === null) {
      return;
    }

    if (viewType === TIME_GRID_DAY) {
      dayButton.classList.add(activeClass);
      weekButton.classList.remove(activeClass);
    }

    if (viewType === TIME_GRID_WEEK) {
      dayButton.classList.remove(activeClass);
      weekButton.classList.add(activeClass);
    }
  };

  handleEventRender = info => {
    const isBeingCreated = info.event.id === '';
    const duration = this.getDurationText(info.event);
    const isDayGrid = this.viewType === TIME_GRID_DAY;

    if (duration && isDayGrid && isBeingCreated) {
      const eventDuration = document.createElement('span');
      eventDuration.textContent = ` (${duration})`;
      eventDuration.classList.add('app-TimePickerCalendar__maxDuration');

      const timeElement = info.el.querySelector('div.fc-time');

      if (timeElement) {
        timeElement.append(eventDuration);
      }
    }
  };

  // https://fullcalendar.io/docs/viewSkeletonRender
  handleViewSkeletonRender = info => {
    const viewType = info.view.type;

    // Correctly set active class for the custom day and time grid
    // buttons.
    this.handleCustomButtonActiveState(viewType);
  };

  handleScrollCalendarToCurrentTime = () => {
    const now = new Date().getTime();
    const startOfToday = new Date(now).setHours(0, 0, 0, 0);
    // Find the amount of time that has passed today, and take away two
    // hours. This way the calendar will scroll with current time, while
    // leaving revealing a bit of the past as well.
    const twoHoursAgo = now - startOfToday - 2 * ONE_HOUR_IN_MS;

    this.calendarApi.scrollToTime(twoHoursAgo);
  };

  render() {
    const { date, resource } = this.props;
    const calendarOptions = this.getCalendarOptions();
    const businessHours = getFullCalendarBusinessHours(resource, date);
    const events = this.getEvents();
    const maxTime = getFullCalendarMaxTime(resource, date, this.viewType);
    const minTime = getFullCalendarMinTime(resource, date, this.viewType);
    const slotLabelInterval = getFullCalendarSlotLabelInterval(resource);

    return (
      <CalendarStyleOverrides>
        <FullCalendar
          {...calendarOptions}
          businessHours={businessHours}
          defaultDate={date}
          eventRender={this.handleEventRender}
          events={events}
          maxTime={maxTime}
          minTime={minTime}
          ref={this.calendarRef}
          slotLabelInterval={slotLabelInterval}
          viewSkeletonRender={this.handleViewSkeletonRender}
        />
        <CalendarLegend />
      </CalendarStyleOverrides>
    );
  }
}

export default injectIntl(TimePickerCalendar);
