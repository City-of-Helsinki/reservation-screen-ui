import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';
import { DEFAULT_CALENDAR_VIEW } from '../Calendar/calendarConstants';
import Wrapper from './Wrapper';

function getIsBookingExpanded(nextViewType) {
  return nextViewType === 'timeGridWeek';
}

const Booking = ({
  isResourceAvailable,
  resourceName,
  resourceDescription,
  upcomingReservations,
}) => {
  const [isBookingExpanded, setBookingExpanded] = useState(
    getIsBookingExpanded(DEFAULT_CALENDAR_VIEW),
  );

  const handleCalendarViewChange = useCallback(nextViewType => {
    const nextIsBookingExpanded = getIsBookingExpanded(nextViewType);

    setBookingExpanded(nextIsBookingExpanded);
  }, []);

  return (
    <Wrapper>
      <AreaStatus
        isCondensed={isBookingExpanded}
        isResourceAvailable={isResourceAvailable}
        resourceName={resourceName}
        resourceDescription={resourceDescription}
        upcomingReservations={upcomingReservations}
      />
      <AreaBooking onCalendarViewChange={handleCalendarViewChange} />
    </Wrapper>
  );
};

Booking.propTypes = {
  isResourceAvailable: PropTypes.bool,
  resourceName: PropTypes.string,
  resourceDescription: PropTypes.string,
  upcomingReservations: PropTypes.object,
};

export default Booking;
