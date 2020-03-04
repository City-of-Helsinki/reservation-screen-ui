/* eslint-disable react/prop-types */
import React from 'react';

import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';
import Wrapper from './Wrapper';

// eslint-disable-next-line react/prefer-stateless-function
class Booking extends React.Component {
  render() {
    return (
      <Wrapper>
        <AreaStatus
          upcomingReservations={this.props.upcomingReservations}
          resourceName={this.props.resourceName}
          isResourceAvailable={this.props.isResourceAvailable}
          resourceDescription={this.props.resourceDescription}
        />
        <AreaBooking />
      </Wrapper>
    );
  }
}

export default Booking;
