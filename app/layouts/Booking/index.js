import React from 'react';

import Wrapper from './Wrapper';
import AreaBooking from 'components/AreaBooking';
import AreaStatus from 'components/AreaStatus';

class Booking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <AreaStatus upcomingReservations={this.props.upcomingReservations} />
        <AreaBooking />
      </Wrapper>
    );
  }
}

export default Booking;
