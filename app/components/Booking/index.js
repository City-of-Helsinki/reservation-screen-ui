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
  resourceId,
  resourceName,
  resourceDescription,
  resourcePeopleCount,
  resourceMaxReservationTime,
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
      <AreaBooking
        isCondensed={isBookingExpanded}
        isResourceAvailable={isResourceAvailable}
        resourceId={resourceId}
        resourceName={resourceName}
        resourceDescription={resourceDescription}
        resourcePeopleCount={resourcePeopleCount}
        resourceMaxReservationTime={resourceMaxReservationTime}
      />
      <AreaStatus onCalendarViewChange={handleCalendarViewChange} />
    </Wrapper>
  );
};

Booking.propTypes = {
  isResourceAvailable: PropTypes.bool,
  resourceId: PropTypes.string,
  resourceName: PropTypes.string,
  resourceDescription: PropTypes.string,
  resourcePeopleCount: PropTypes.number,
  resourceMaxReservationTime: PropTypes.string,
};

export default Booking;
