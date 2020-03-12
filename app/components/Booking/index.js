import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';
import { DEFAULT_CALENDAR_VIEW } from 'components/Calendar/calendarConstants';
import Wrapper from './Wrapper';

function getIsBookingExpanded(nextViewType) {
  return nextViewType === 'timeGridWeek';
}

function getEmptyReservation(currentSlot, resource) {
  if (!resource || !currentSlot || !currentSlot.begin || !currentSlot.end) {
    return null;
  }

  return {
    begin: `${dateFormat(currentSlot.begin, 'yyyy-mm-dd')}T${dateFormat(
      currentSlot.begin,
      'HH:MM:ss.000o',
    )}`,
    end: `${dateFormat(currentSlot.end, 'yyyy-mm-dd')}T${dateFormat(
      currentSlot.end,
      'HH:MM:ss.000o',
    )}`,
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
  };
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

  return (
    <Wrapper>
      <AreaBooking
        isCondensed={isBookingExpanded}
        isResourceAvailable={isResourceAvailable}
        reservationBeingCreated={reservationBeingCreated}
        onStartBooking={handleBookingStart}
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
