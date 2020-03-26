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
import {
  toggleIsDescriptionOpen,
  makeReservation,
} from 'containers/HomePage/actions';
import LocaleToggle from 'containers/LocaleToggle';
import QuickBooking from 'components/QuickBooking';
import StrongAuth from 'components/StrongAuth';

import Wrapper from './Wrapper';
import TopAreaWrapper from './TopAreaWrapper';
import MidAreaWrapper from './MidAreaWrapper';

// Some resource can not be reserved through this application, only
// their status should be viewable.
function getOnlyInfoAllowed(resource) {
  const needManualConfirmation = resource.get('need_manual_confirmation', true);
  const maxPricePerHour = resource.get('max_price_per_hour');
  const reservableMinDaysInAdvance = resource.get(
    'reservable_min_days_in_advance',
  );

  return (
    needManualConfirmation &&
    (maxPricePerHour === null || Number(maxPricePerHour) === 0) &&
    (reservableMinDaysInAdvance && reservableMinDaysInAdvance > 1)
  );
}

const defaultLocale = 'fi';
function getLocalizedString(localizationObject, locale = defaultLocale) {
  if (!localizationObject) {
    return '';
  }

  const localizedString = localizationObject.get(locale, null);

  // If we do not find a localized string, we'll try to use the default
  // locale.
  if (localizedString === null) {
    return localizationObject.get(defaultLocale);
  }

  return localizedString;
}

const AreaBooking = ({
  availableUntil,
  currentSlot,
  date,
  isCondensed,
  isDescriptionOpen,
  isResourceAvailable,
  nextAvailableTime,
  onConfirmBooking,
  onDecreaseBookingDuration,
  onDismissBooking,
  onIncreaseBookingDuration,
  onToggleDescriptionOpen,
  onStartBooking,
  reservationBeingCreated,
  resource: resourceWithoutDefault,
}) => {
  const { locale } = useIntl();

  const resource = resourceWithoutDefault || new Map();
  const resourceId = resource.get('id');
  const resourceName = getLocalizedString(resource.get('name'), locale);
  const resourcePeopleCount = resource.get('people_capacity');
  const resourceMaxReservationDuration = resource.get('max_period');
  const resourceMinReservationDuration = resource.get('min_period');
  const resourceSlotSize = resource.get('slot_size');
  const resourceDescription = getLocalizedString(
    resource.get('description'),
    locale,
  )
    // Show line breaks
    .replace(/\n/g, '<br />');
  const wrapperClass = Object.entries({
    'slide-down': true,
    'hide-on-toggle': isCondensed,
  })
    .filter(([, isIncluded]) => isIncluded)
    .map(([className]) => className)
    .join(' ');
  const isOnlyInfoAllowed = getOnlyInfoAllowed(resource);
  const isNeedManualConfirmation =
    resource.get('need_manual_confirmation') === true;
  // Max price can be of type hours, day, week and fixed. It's enough
  // for us to know that it's greater than zero for any of these types.
  const hasMaxPrice = resource.get('max_price', 0) > 0;

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

  const handleConfirmBooking = useCallback(
    () => {
      onConfirmBooking(reservationBeingCreated);
    },
    [onConfirmBooking, reservationBeingCreated],
  );

  return (
    <Wrapper className={wrapperClass}>
      <TopAreaWrapper>
        <Clock className={isDescriptionOpen} date={date} />
        <LocaleToggle />
      </TopAreaWrapper>
      <MidAreaWrapper>
        <Status
          availableUntil={availableUntil}
          isNeedManualConfirmation={isNeedManualConfirmation}
          isOnlyInfoAllowed={isOnlyInfoAllowed}
          isResourceAvailable={isResourceAvailable}
          nextAvailableTime={nextAvailableTime}
          resourceName={resourceName}
          resourcePeopleCount={resourcePeopleCount}
          resourceMaxReservationTime={resourceMaxReservationDuration}
        />
        {isResourceAvailable &&
          !isOnlyInfoAllowed &&
          !isNeedManualConfirmation &&
          !hasMaxPrice && (
            <QuickBooking
              isHidden={isDescriptionOpen}
              onConfirmBooking={handleConfirmBooking}
              onDecreaseBookingDuration={handleOnDecreaseBookingDuration}
              onDismissBooking={onDismissBooking}
              onIncreaseBookingDuration={handleOnIncreaseBookingDuration}
              onStartBooking={handleStartBooking}
              reservationBeingCreated={reservationBeingCreated}
              resourceMaxReservationDuration={resourceMaxReservationDuration}
              resourceMinReservationDuration={resourceMinReservationDuration}
              resourceSlotSize={resourceSlotSize}
            />
          )}
        {(!isResourceAvailable ||
          isOnlyInfoAllowed ||
          isNeedManualConfirmation ||
          hasMaxPrice) && (
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
  onConfirmBooking: PropTypes.func.isRequired,
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
    onConfirmBooking: reservation => dispatch(makeReservation(reservation)),
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
