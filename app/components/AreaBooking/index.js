import React, { useState } from 'react';
import Upcoming from 'components/Upcoming';
import Clock from 'components/Clock';
import Status from 'components/Status';
import SlideUpContent from 'components/SlideUpContent';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  makeSelectDate,
  makeSelectNextAvailableTime,
  makeSelectAvailableUntil,
  makeSelectIsDescriptionOpen,
} from 'containers/HomePage/selectors';
import { toggleIsDescriptionOpen } from 'containers/HomePage/actions';
import LocaleToggle from 'containers/LocaleToggle';

import Wrapper from './Wrapper';
import TopAreaWrapper from './TopAreaWrapper';

const AreaBooking = ({
  isCondensed,
  isDescriptionOpen,
  date,
  resourceName,
  nextAvailableTime,
  availableUntil,
  isResourceAvailable,
  upcomingReservations,
  resourceDescription,
  onToggleDescriptionOpen,
}) => {
  const [isHidden] = useState('');
  const wrapperClass = Object.entries({
    'slide-down': true,
    'hide-on-toggle': isCondensed,
  })
    .filter(([, isIncluded]) => isIncluded)
    .map(([className]) => className)
    .join(' ');

  return (
    <Wrapper className={wrapperClass}>
      <TopAreaWrapper>
        <Clock className={isDescriptionOpen} date={date} />
        <LocaleToggle />
      </TopAreaWrapper>
      <Status
        resourceName={resourceName}
        nextAvailableTime={nextAvailableTime}
        availableUntil={availableUntil}
        isResourceAvailable={isResourceAvailable}
      />
      <Upcoming
        className={isHidden}
        upcomingReservations={upcomingReservations}
      />
      {resourceDescription && (
        <SlideUpContent
          visible={isDescriptionOpen}
          content={resourceDescription}
          onButtonClick={() => onToggleDescriptionOpen()}
        />
      )}
    </Wrapper>
  );
};

AreaBooking.propTypes = {
  isCondensed: PropTypes.bool.isRequired,
  isDescriptionOpen: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  resourceName: PropTypes.string,
  nextAvailableTime: PropTypes.bool.isRequired,
  availableUntil: PropTypes.bool.isRequired,
  isResourceAvailable: PropTypes.bool.isRequired,
  upcomingReservations: PropTypes.object.isRequired,
  resourceDescription: PropTypes.string.isRequired,
  onToggleDescriptionOpen: PropTypes.func.isRequired,
};

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

export default compose(withConnect)(AreaBooking);
