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

moment.tz.setDefault(TIME_ZONE);
// Re-apply moment-timezone default timezone, cause FullCalendar import have override the import

class TimePickerCalendar extends Component {
  calendarRef = React.createRef();
  timer = null;

  static propTypes = {
    date: PropTypes.string,
    editingReservation: PropTypes.object,
    height: PropTypes.number,
    intl: PropTypes.object.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    onViewTypeChange: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
    reservationBeingCreated: PropTypes.object,
  };

  state = {
    viewType: DEFAULT_CALENDAR_VIEW,
    header: {
      left: '',
      center: 'timeGridDay, timeGridWeek',
      right: '',
    },
  };

  componentDidMount() {
    // Scroll calendar to current time when mounted.
    this.scrollCalendarToCurrentTime();

    // And scroll again after each passing hour.
    this.timer = setInterval(
      () => this.scrollCalendarToCurrentTime(),
      ONE_HOUR_IN_MS,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldComponentUpdate(prevProps, prevState) {
    // For some (god forsaken) reason, changes in into the viewType end
    // up messing the height of the calendar. I tried my best to find
    // the code causing this, but I did not. I'll retain this check and
    // hopefully I'll come across the root reason. If you are reading
    // this, then likely I didn't.
    if (this.state.viewType !== prevState.viewType) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { date } = this.props;
    const { viewType } = this.state;

    const calendarApi = this.calendarRef.current.getApi();

    if (date !== prevProps.date) {
      calendarApi.gotoDate(date);
    }
    if (viewType !== prevState.viewType) {
      calendarApi.changeView(viewType);
    }
  }

  onEventRender = info => {
    const duration = this.getDurationText(info.event);

    if (duration) {
      const eventDuration = document.createElement('span');
      eventDuration.textContent = ` (${duration})`;
      eventDuration.classList.add('app-TimePickerCalendar__maxDuration');

      const timeElement = info.el.querySelector('div.fc-time');

      if (timeElement) {
        timeElement.append(eventDuration);
      }
    }
  };

  onDatesRender = info => {
    const { viewType } = this.state;
    const view = info.view.type;

    if (viewType !== view) {
      this.props.onViewTypeChange(view);
      this.setState({ viewType: view });
    }
  };

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

  getCalendarOptions = () => ({
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
    unselectAuto: false,
    longPressDelay: 250,
    eventLongPressDelay: 20,
    selectLongPressDelay: 200,
    // Almost invoke click event on mobile immediatelly without any delay
    defaultView: DEFAULT_CALENDAR_VIEW,
  });

  getEvents = () => this.getReservedEvents();

  scrollCalendarToCurrentTime = () => {
    const calendarApi = this.calendarRef.current.getApi();
    const now = new Date().getTime();
    const startOfToday = new Date(now).setHours(0, 0, 0, 0);
    // Find the amount of time that has passed today, and take away two
    // hours. This way the calendar will scroll with current time, while
    // leaving revealing a bit of the past as well.
    const twoHoursAgo = now - startOfToday - 2 * ONE_HOUR_IN_MS;

    calendarApi.scrollToTime(twoHoursAgo);
  };

  render() {
    const { date, resource } = this.props;
    const { viewType, header } = this.state;

    return (
      <CalendarStyleOverrides>
        <FullCalendar
          {...this.getCalendarOptions()}
          allDaySlot={false}
          businessHours={getFullCalendarBusinessHours(resource, date)}
          datesRender={this.onDatesRender}
          defaultDate={date}
          events={this.getEvents()}
          header={header}
          maxTime={getFullCalendarMaxTime(resource, date, viewType)}
          minTime={getFullCalendarMinTime(resource, date, viewType)}
          eventRender={this.onEventRender}
          ref={this.calendarRef}
          slotDuration="00:15:00"
          slotLabelInterval={getFullCalendarSlotLabelInterval(resource)}
        />
        <CalendarLegend />
      </CalendarStyleOverrides>
    );
  }
}

export default injectIntl(TimePickerCalendar);
