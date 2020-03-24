/* stylelint-disable */
import styled from 'styled-components';
import theme from './calendarTheme';

const rootClassName = 'app-TimePickerCalendar';

const CalendarStyleOverrides = styled.div.attrs({
  className: rootClassName,
})`
  &&& .${rootClassName}__event {
    margin-bottom: 1px;

    color: ${theme.WHITE};

    background-color: ${theme.RED};
  }

  & .${rootClassName}__event--unconfirmed {
    color: ${theme.WHITE};

    background-color: ${theme.HEL_COAT};
  }

  & .${rootClassName}__restrictedDate {
    background-color: ${theme.GRAY_LIGHT};
  }

  & .${rootClassName}__newReservation {
    position: relative;
  }

  & .${rootClassName}__cancelEvent {
    position: absolute;
    right: 0.25em;
    bottom: 0;
    z-index: 2;
  }

  & .${rootClassName}__cancelEvent::after {
    display: inline;
    content: '\00D7';
    font-size: 1.25em;
    font-weight: bold;
    line-height: 0.75;
  }

  & .${rootClassName}__maxDuration {
    font-size: 1.25rem;
  }

  &&& .fc-today,
  &&& .fc-bgevent {
    background: transparent;
  }

  &&& .fc-past,
  &&& .fc-future {
    background: ${theme.GRAY_LIGHT};
  }

  & .fc-ltr .fc-time-grid .fc-event-container {
    margin: 0;
  }

  & .fc-event,
  & .fc-event:hover {
    padding: 9px 8px;
    margin: 0;

    font-size: 1.75rem;
    font-weight: bold;

    border: none;
    border-radius: 0;
  }

  & .fc-event.fc-selected::after {
    background-color: #bddbf0;
    color: ${theme.HEL_COAT};
  }

  & .fc-time-grid-event.fc-selected .fc-resizer {
    width: 12px;
    height: 12px;
    bottom: -7px;
    left: 49%;
    z-index: 50 !important;
    border-radius: 50%;
  }

  & .fc-time-grid-event.fc-selected .fc-resizer::before {
    width: 80px;
    height: 80px;
    top: 0;
    left: 0;
    margin-left: -40px;
  }

  & .fc-time-grid-event.fc-selected .fc-resizer::after {
    color: #fff !important;
  }

  & .fc-time-grid-event .fc-time,
  & .fc-time-grid-event .fc-title {
    font-size: ${props => props.theme.fontSize[3]};
    line-height: 1.3;
  }

  .fc-header-toolbar .fc-myToday-button {
    border-radius: 0;
    padding: 0.5rem 0.5rem;
    color: ${theme.BLACK};
    font-weight: ${theme.FONT_WEIGHT_BOLD};
  }

  .fc-header-toolbar .fc-myToday-button:disabled {
    border: none;
    background: ${theme.HEL_COAT};
    font-weight: ${theme.FONT_WEIGHT_BOLD};
    color: ${theme.WHITE};
    opacity: 1;
  }

  .fc-header-toolbar .fc-myPrev-button,
  .fc-header-toolbar .fc-myNext-button {
    font-size: 2.5rem;
    margin: 0 !important;
    background: ${theme.WHITE};
    color: ${theme.BLACK};
    border: 0;
  }

  .fc-header-toolbar .fc-timeGridWeek-button,
  .fc-header-toolbar .fc-timeGridDay-button {
    padding: 0.5rem 3rem;

    color: ${theme.BLACK};

    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 0;
    background: none;
  }

  .fc-header-toolbar .fc-timeGridDay-button:not(:last-child) {
    margin-right: 5px;
  }

  &&& .fc-header-toolbar .fc-button-active {
    color: ${theme.BLACK};

    background: none;
    border-bottom-color: ${theme.BLACK};
  }

  .fc-header-toolbar .fc-myNext-button {
    @include icon-angle-right(${theme.BLACK});
  }

  .fc-header-toolbar .fc-myPrev-button {
    @include icon-angle-left(${theme.BLACK});
  }

  @media (max-width: ${theme.SCREEN_XS_MAX}) {
    .fc-time-grid .fc-slats td {
      height: 2em !important;
    }

    .fc-view-container {
      overflow: scroll;
    }

    .fc-view-container .fc-timeGridWeek-view {
      width: 700px;
    }

    .fc-header-toolbar {
    }

    .fc-header-toolbar .fc-center {
      text-align: center;
    }

    .fc-header-toolbar .fc-center h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: ${theme.SCREEN_XS_MIN}) {
    .fc-header-toolbar {
    }

    .fc-header-toolbar .fc-next-button,
    .fc-header-toolbar .fc-prev-button {
      width: 3rem;
    }
  }
`;

export default CalendarStyleOverrides;
