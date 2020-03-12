import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { fromJS } from 'immutable';
import moment from 'moment';

import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';
import { DEFAULT_CALENDAR_VIEW } from 'components/Calendar/calendarConstants';
import Wrapper from './Wrapper';

function getIsBookingExpanded(nextViewType) {
  return nextViewType === 'timeGridWeek';
}

function getFormattedDate(date) {
  return `${dateFormat(date, 'yyyy-mm-dd')}T${dateFormat(
    date,
    'HH:MM:ss.000o',
  )}`;
}

// HH:mm:SS
function timeToParts(time) {
  return time.split(':').map(part => Number(part));
}

function getEmptyReservation(currentSlot, resource) {
  if (!resource || !currentSlot || !currentSlot.begin || !currentSlot.end) {
    return null;
  }

  return fromJS({
    begin: getFormattedDate(currentSlot.begin),
    end: getFormattedDate(currentSlot.end),
    resource: resource.get('id'),
    event_subject: 'Varattu',
    event_description: 'Varattu',
    reserver_address_city: 'Helsinki',
    reserver_address_zip: '00100',
    reserver_address_street: 'Helsinki',
    reserver_email_address: 'info@oodihelsinki.fi',
    reserver_phone_number: '123456789',
    reserver_name: 'Anonymous reserver',
    reserver_id: 'anonymous',
  });
}

const Booking = ({ isResourceAvailable }) => {
  const [isBookingExpanded, setBookingExpanded] = useState(
    getIsBookingExpanded(DEFAULT_CALENDAR_VIEW),
  );
  const [reservationBeingCreated, setReservationBeingCreated] = useState(null);

  const handleCalendarViewChange = useCallback(nextViewType => {
    const nextIsBookingExpanded = getIsBookingExpanded(nextViewType);

    setBookingExpanded(nextIsBookingExpanded);
  }, []);

  const handleBookingStart = useCallback((currentSlot, resource) => {
    setReservationBeingCreated(getEmptyReservation(currentSlot, resource));
  }, []);

  const handleBookingDismiss = useCallback(() => {
    setReservationBeingCreated(null);
  }, []);

  const handleDecreaseBookingDuration = useCallback(resource => {
    setReservationBeingCreated(previousReservation => {
      const previousEndTime = previousReservation.get('end');
      const slotSize = resource.get('slot_size', '00:30:00');
      const [hours, minutes, seconds] = timeToParts(slotSize);
      const nextEndTime = moment(previousEndTime)
        .subtract(hours, 'hours')
        .subtract(minutes, 'minutes')
        .subtract(seconds, 'seconds');
      const formattedNextEndTime = getFormattedDate(nextEndTime);

      return previousReservation.set('end', formattedNextEndTime);
    });
  }, []);

  const handleIncreaseBookingDuration = useCallback(resource => {
    setReservationBeingCreated(previousReservation => {
      const previousEndTime = previousReservation.get('end');
      const slotSize = resource.get('slot_size', '00:30:00');
      const [hours, minutes, seconds] = timeToParts(slotSize);
      const nextEndTime = moment(previousEndTime)
        .add(hours, 'hours')
        .add(minutes, 'minutes')
        .add(seconds, 'seconds');
      const formattedNextEndTime = getFormattedDate(nextEndTime);

      return previousReservation.set('end', formattedNextEndTime);
    });
  }, []);

  return (
    <Wrapper>
      <AreaBooking
        isCondensed={isBookingExpanded}
        isResourceAvailable={isResourceAvailable}
        onDecreaseBookingDuration={handleDecreaseBookingDuration}
        onDismissBooking={handleBookingDismiss}
        onIncreaseBookingDuration={handleIncreaseBookingDuration}
        onStartBooking={handleBookingStart}
        reservationBeingCreated={reservationBeingCreated}
      />
      <AreaStatus
        reservationBeingCreated={reservationBeingCreated}
        onCalendarViewChange={handleCalendarViewChange}
      />
    </Wrapper>
  );
};

Booking.propTypes = {
  isResourceAvailable: PropTypes.bool,
};

export default Booking;
