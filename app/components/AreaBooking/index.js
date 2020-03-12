import React from 'react';
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
import QuickBooking from 'components/QuickBooking';

import Wrapper from './Wrapper';
import TopAreaWrapper from './TopAreaWrapper';
import MidAreaWrapper from './MidAreaWrapper';

const AreaBooking = ({
  isCondensed,
  isDescriptionOpen,
  date,
  resourceId,
  resourceName,
  resourcePeopleCount,
  resourceMaxReservationTime,
  nextAvailableTime,
  availableUntil,
  isResourceAvailable,
  resourceDescription,
  onToggleDescriptionOpen,
}) => {
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
      <MidAreaWrapper>
        <Status
          resourceId={resourceId}
          resourceName={resourceName}
          resourcePeopleCount={resourcePeopleCount}
          resourceMaxReservationTime={resourceMaxReservationTime}
          nextAvailableTime={nextAvailableTime}
          availableUntil={availableUntil}
          isResourceAvailable={isResourceAvailable}
        />
        {isResourceAvailable && (
          <QuickBooking
            // resourceMaxReservationTime={{}}
            // resourceMinReservationTime={{}}
            // resourceSlotSize={{}}
            onStartBooking={() => {}}
            // onConfirmBooking={() => {}}
            // onDismissBooking={() => {}}
            // onIncreaseBookingTime={() => {}}
            // onDecreaseBookingTime={() => {}}
          />
        )}
      </MidAreaWrapper>
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
  resourceId: PropTypes.string,
  resourceName: PropTypes.string,
  resourceDescription: PropTypes.string.isRequired,
  resourcePeopleCount: PropTypes.number,
  resourceMaxReservationTime: PropTypes.string,
  nextAvailableTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  availableUntil: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  isResourceAvailable: PropTypes.bool.isRequired,
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
