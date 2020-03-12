import React, { useCallback } from 'react';
import Clock from 'components/Clock';
import Status from 'components/Status';
import SlideUpContent from 'components/SlideUpContent';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Map } from 'immutable';
import {
  makeSelectAvailableUntil,
  makeSelectDate,
  makeSelectFreeSlots,
  makeSelectIsDescriptionOpen,
  makeSelectNextAvailableTime,
  makeSelectResource,
} from 'containers/HomePage/selectors';
import { toggleIsDescriptionOpen } from 'containers/HomePage/actions';
import LocaleToggle from 'containers/LocaleToggle';
import QuickBooking from 'components/QuickBooking';
import StrongAuth from 'components/StrongAuth';

import Wrapper from './Wrapper';
import TopAreaWrapper from './TopAreaWrapper';
import MidAreaWrapper from './MidAreaWrapper';

const AreaBooking = ({
  availableUntil,
  currentSlot,
  date,
  isCondensed,
  isDescriptionOpen,
  isResourceAvailable,
  nextAvailableTime,
  onIncreaseBookingDuration,
  onDecreaseBookingDuration,
  onDismissBooking,
  onToggleDescriptionOpen,
  onStartBooking,
  reservationBeingCreated,
  resource: resourceWithoutDefault,
}) => {
  const { locale } = useIntl();

  const resource = resourceWithoutDefault || new Map();
  const localeWithDefault = locale || 'fi';
  const resourceId = resource.get('id');
  const resourceName = resource.getIn(['name', localeWithDefault], '');
  const resourcePeopleCount = resource.get('people_capacity');
  const resourceMaxReservationTime = resource.get('max_period');
  const resourceDescription = resource
    .getIn(['description', localeWithDefault], '')
    // Show line breaks
    .replace(/\n/, '<br /><br />');
  const wrapperClass = Object.entries({
    'slide-down': true,
    'hide-on-toggle': isCondensed,
  })
    .filter(([, isIncluded]) => isIncluded)
    .map(([className]) => className)
    .join(' ');

  const handleStartBooking = useCallback(
    () => {
      onStartBooking(currentSlot[0], resource);
    },
    [onStartBooking, currentSlot, resource],
  );

  const handleOnDecreaseBookingDuration = useCallback(
    () => {
      onDecreaseBookingDuration(resource);
    },
    [onDecreaseBookingDuration, resource],
  );

  const handleOnIncreaseBookingDuration = useCallback(
    () => {
      onIncreaseBookingDuration(resource);
    },
    [onIncreaseBookingDuration, resource],
  );

  return (
    <Wrapper className={wrapperClass}>
      <TopAreaWrapper>
        <Clock className={isDescriptionOpen} date={date} />
        <LocaleToggle />
      </TopAreaWrapper>
      <MidAreaWrapper>
        <Status
          resourceName={resourceName}
          resourcePeopleCount={resourcePeopleCount}
          resourceMaxReservationTime={resourceMaxReservationTime}
          nextAvailableTime={nextAvailableTime}
          availableUntil={availableUntil}
          isResourceAvailable={isResourceAvailable}
        />
        {isResourceAvailable && (
          <QuickBooking
            isHidden={isDescriptionOpen}
            // resourceMaxReservationTime={{}}
            // resourceMinReservationTime={{}}
            // resourceSlotSize={{}}
            onConfirmBooking={() => {}}
            onDecreaseBookingDuration={handleOnDecreaseBookingDuration}
            onDismissBooking={onDismissBooking}
            onIncreaseBookingDuration={handleOnIncreaseBookingDuration}
            onStartBooking={handleStartBooking}
            reservationBeingCreated={reservationBeingCreated}
          />
        )}
        {!isResourceAvailable && (
          <StrongAuth isHidden={isDescriptionOpen} resourceId={resourceId} />
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
  availableUntil: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  currentSlot: PropTypes.array,
  date: PropTypes.instanceOf(Date).isRequired,
  isCondensed: PropTypes.bool.isRequired,
  isDescriptionOpen: PropTypes.bool,
  isResourceAvailable: PropTypes.bool.isRequired,
  nextAvailableTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  onDismissBooking: PropTypes.func.isRequired,
  onDecreaseBookingDuration: PropTypes.func.isRequired,
  onIncreaseBookingDuration: PropTypes.func.isRequired,
  onToggleDescriptionOpen: PropTypes.func.isRequired,
  onStartBooking: PropTypes.func.isRequired,
  reservationBeingCreated: PropTypes.object,
  resource: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onToggleDescriptionOpen: () => dispatch(toggleIsDescriptionOpen()),
  };
}

const mapStateToProps = createStructuredSelector({
  availableUntil: makeSelectAvailableUntil(),
  currentSlot: makeSelectFreeSlots(1),
  date: makeSelectDate(),
  isDescriptionOpen: makeSelectIsDescriptionOpen(),
  nextAvailableTime: makeSelectNextAvailableTime(),
  resource: makeSelectResource(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AreaBooking);
