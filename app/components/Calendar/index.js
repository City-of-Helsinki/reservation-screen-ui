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
  getFullCalendarSlotDuration,
  getFullCalendarSlotLabelInterval,
} from './resourceUtils';
import CalendarStyleOverrides from './CalendarStyleOverrides';
import {
  TIME_ZONE,
  DATE_FORMAT,
  DEFAULT_CALENDAR_VIEW,
} from './calendarConstants';
import messages from './messages';

moment.tz.setDefault(TIME_ZONE);
// Re-apply moment-timezone default timezone, cause FullCalendar import have override the import

class TimePickerCalendar extends Component {
  calendarRef = React.createRef();

  static propTypes = {
    date: PropTypes.string,
    resource: PropTypes.object.isRequired,
    onDateChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    onTimeChange: PropTypes.func.isRequired,
    editingReservation: PropTypes.object,
    height: PropTypes.number,
    onViewTypeChange: PropTypes.func.isRequired,
  };

  state = {
    viewType: DEFAULT_CALENDAR_VIEW,
    header: {
      left: '', // 'myPrev,myNext,myToday',
      center: 'timeGridDay,timeGridWeek',
      right: '',
    },
  };

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
    // add cancel button for new selected event
    let duration;

    if (info.event.id === '') {
      duration = this.getDurationText(info.event);
    }

    if (duration) {
      const eventDuration = document.createElement('span');
      eventDuration.textContent = duration;
      eventDuration.classList.add('app-TimePickerCalendar__maxDuration');
      info.el.append(eventDuration);
    }
  };

  onDatesRender = info => {
    const { viewType, header } = this.state;
    let view = info.view.type;
    let headerConfig = header;

    // 768
    if (window.innerWidth < 768) {
      // mobile view config
      view = 'timeGridDay';
      headerConfig = {
        left: '', // 'myPrev,myNext,myToday'
        center: 'title',
        right: 'timeGridDay,timeGridWeek',
      };
    }

    if (viewType !== view) {
      this.props.onViewTypeChange(view);
      this.setState({ viewType: view, header: headerConfig });
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
      maxDurationText = `(${maxDurationSeconds / 3600}h max)`;
    }

    return `${duration / 3600000}h ${maxDurationText}`;
  };

  getReservedEvents = () => {
    const { resource, date } = this.props;

    // Add the resources reservations as normal FullCalendar events.
    const reservations = get(resource, 'reservations', []);
    const events = isEmpty(reservations)
      ? []
      : reservations.map(reservation => ({
          classNames: 'app-TimePickerCalendar__event',
          editable: false,
          id: reservation.id,
          start: moment(reservation.begin).toDate(),
          end: moment(reservation.end).toDate(),
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

  render() {
    const { date, onDateChange, resource, intl } = this.props;
    const { viewType, header } = this.state;
    const addValue = viewType === 'timeGridWeek' ? 'w' : 'd';
    return (
      <CalendarStyleOverrides>
        <FullCalendar
          {...this.getCalendarOptions()}
          allDaySlot={false}
          businessHours={getFullCalendarBusinessHours(resource, date)}
          customButtons={{
            myPrev: {
              text: ' ',
              click: () =>
                onDateChange(
                  moment(date)
                    .subtract(1, addValue)
                    .toDate(),
                ),
            },
            myNext: {
              text: ' ',
              click: () =>
                onDateChange(
                  moment(date)
                    .add(1, addValue)
                    .toDate(),
                ),
            },
            myToday: {
              text: intl.formatMessage(messages.today),
              click: () =>
                onDateChange(
                  this.calendarRef.current.calendar.view.initialNowDate,
                ),
            },
          }}
          datesRender={this.onDatesRender}
          defaultDate={date}
          events={this.getEvents()}
          header={header}
          maxTime={getFullCalendarMaxTime(resource, date, viewType)}
          minTime={getFullCalendarMinTime(resource, date, viewType)}
          ref={this.calendarRef}
          slotDuration={getFullCalendarSlotDuration(resource, date, viewType)}
          slotLabelInterval={getFullCalendarSlotLabelInterval(resource)}
        />
        <CalendarLegend />
      </CalendarStyleOverrides>
    );
  }
}

export default injectIntl(TimePickerCalendar);
