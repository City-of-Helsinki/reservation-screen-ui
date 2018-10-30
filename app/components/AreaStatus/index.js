import React from 'react';
import Wrapper from './Wrapper';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Status from 'components/Status';
import SlideUpContent from 'components/SlideUpContent';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectDate,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
  makeSelectIsDescriptionOpen,
} from 'containers/HomePage/selectors';
import { toggleIsDescriptionOpen } from 'containers/HomePage/actions';

/* eslint-disable react/prefer-stateless-function */
class AreaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClass: 'slide-down',
    };
  }

  render() {
    return (
      <Wrapper className={this.state.toggleClass}>
        <Clock
          className={this.props.isDescriptionOpen}
          date={this.props.date}
        />

        <Status
          resourceName={this.props.resourceName}
          nextAvailableTime={this.props.nextAvailableTime}
          availableUntil={this.props.availableUntil}
          isResourceAvailable={this.props.isResourceAvailable}
        />

        <Upcoming
          className={this.state.isHidden}
          upcomingReservations={this.props.upcomingReservations}
        />

        {this.props.resourceDescription && (
          <SlideUpContent
            visible={this.props.isDescriptionOpen}
            content={this.props.resourceDescription}
            onButtonClick={() => this.props.onToggleDescriptionOpen()}
          />
        )}
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onToggleDescriptionOpen: () => dispatch(toggleIsDescriptionOpen()),
  };
}

const mapStateToProps = createStructuredSelector({
  date: makeSelectDate(),
  nextAvailableTime: makeSelectNextAvailableTime(),
  availableUntil: makeSelectAvailableUntil(),
  isDescriptionOpen: makeSelectIsDescriptionOpen(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AreaStatus);
