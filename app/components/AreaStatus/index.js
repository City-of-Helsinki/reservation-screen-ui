import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Status from 'components/Status';
import ButtonBase from 'components/BasicButton';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectDate,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
} from 'containers/HomePage/selectors';

const ShowMoreButton = styled(ButtonBase)`
  background: transparent;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 18px;
`;
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
        <ShowMoreButton>
          <FormattedMessage {...messages.showMore} />
        </ShowMoreButton>
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
