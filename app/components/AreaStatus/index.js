import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Content from './Content';
import messages from './messages';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectDate,
  makeSelectNextAvailableTime,
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
        <Content
          resourceName={this.props.resourceName}
          nextAvailableTime={this.props.nextAvailableTime}
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
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AreaStatus);
