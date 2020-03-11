import React from 'react';
import PropTypes from 'prop-types';

import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';
import Wrapper from './Wrapper';

const Booking = ({
  isResourceAvailable,
  resourceName,
  resourceDescription,
  upcomingReservations,
}) => (
  <Wrapper>
    <AreaStatus
      isResourceAvailable={isResourceAvailable}
      resourceName={resourceName}
      resourceDescription={resourceDescription}
      upcomingReservations={upcomingReservations}
    />
    <AreaBooking />
  </Wrapper>
);

Booking.propTypes = {
  isResourceAvailable: PropTypes.bool,
  resourceName: PropTypes.string,
  resourceDescription: PropTypes.string,
  upcomingReservations: PropTypes.object,
};

export default Booking;
