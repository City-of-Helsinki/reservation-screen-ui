import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Status from 'components/Status';
import messages from './messages';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectDate,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
} from 'containers/HomePage/selectors';

/* eslint-disable react/prefer-stateless-function */
class AreaStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <Clock date={this.props.date} />
        <Status
          resourceName={this.props.resourceName}
          nextAvailableTime={this.props.nextAvailableTime}
          availableUntil={this.props.availableUntil}
          isResourceAvailable={this.props.isResourceAvailable}
        />
        <Upcoming upcomingReservations={this.props.upcomingReservations} />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  date: makeSelectDate(),
  nextAvailableTime: makeSelectNextAvailableTime(),
  availableUntil: makeSelectAvailableUntil(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AreaStatus);
