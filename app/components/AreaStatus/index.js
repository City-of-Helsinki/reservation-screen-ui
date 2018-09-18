import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Content from './Content';

/* eslint-disable react/prefer-stateless-function */
class AreaStatus extends React.Component {
  constructor(props) {
    super();
    this.state = {
      room: 'Studiotila 1',
      status: 'Tila on vapaa',
      until: 'klo 13:00 saakka',
    };
  }

  render() {
    return (
      <Wrapper>
        <Clock />
        <Content />
        <Upcoming upcomingReservations={this.props.upcomingReservations} />
      </Wrapper>
    );
  }
}

export default AreaStatus;
