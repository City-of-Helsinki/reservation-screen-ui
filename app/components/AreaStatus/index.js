import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Content from './Content';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class AreaStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <Clock />
        <Content
          resourceName={this.props.resourceName}
          isResourceFree={this.props.isResourceFree}
        />
        <Upcoming upcomingReservations={this.props.upcomingReservations} />
      </Wrapper>
    );
  }
}

export default AreaStatus;
