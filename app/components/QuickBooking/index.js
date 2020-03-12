import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dateFormat from 'dateformat';
import moment from 'moment';

import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import Button from 'components/Button';
import Wrapper from './Wrapper';
import CircleButton from './CircleButton';
import TransparentButton from './TransparentButton';
import messages from './messages';

const ComposerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComposerControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ComposerCurrentEndTime = styled.span`
  margin: 0 50px;

  font-size: 100px;
`;

const Scenes = Object.freeze({
  IDLE: 'idle',
  COMPOSING: 'composing',
});

function getViewScene(isCreatingReservation) {
  if (isCreatingReservation) {
    return Scenes.COMPOSING;
  }

  return Scenes.IDLE;
}

function getCurrentReservationLength(reservation) {
  if (!reservation) {
    return null;
  }

  const startDateTime = moment(reservation.get('begin'));
  const endDateTime = moment(reservation.get('end'));

  return endDateTime.diff(startDateTime, 'hours', true);
}

function timeStringToHourNumber(timeString) {
  if (!timeString) {
    return null;
  }

  const [hours, minutes] = timeString.split(':');
  const minutesInHours = Number(minutes) / 60;

  return Number(hours) + minutesInHours;
}

const QuickBooking = ({
  isHidden,
  onConfirmBooking,
  onDecreaseBookingDuration,
  onDismissBooking,
  onIncreaseBookingDuration,
  onStartBooking,
  reservationBeingCreated,
  resourceMaxReservationDuration,
  resourceMinReservationDuration,
  resourceSlotSize,
}) => {
  const isCreatingReservation = reservationBeingCreated !== null;
  const scene = getViewScene(isCreatingReservation);
  const currentReservationEndTime =
    isCreatingReservation &&
    dateFormat(new Date(reservationBeingCreated.get('end')), 'HH:MM');
  const currentReservationLength = getCurrentReservationLength(
    reservationBeingCreated,
  );
  const minPeriod = timeStringToHourNumber(resourceMinReservationDuration);
  const maxPeriod = timeStringToHourNumber(resourceMaxReservationDuration);
  const slotSize = timeStringToHourNumber(resourceSlotSize);
  const isDurationCanBeDecreased =
    currentReservationLength - slotSize >= minPeriod;
  const isDurationCanBeIncreased =
    currentReservationLength + slotSize <= maxPeriod;

  return (
    <Wrapper className={toggleDisplayClass(isHidden)}>
      {scene === Scenes.IDLE && (
        <CircleButton onClick={onStartBooking} variant="superBig" icon="+">
          <FormattedMessage {...messages.startBookingNewReservation} />
        </CircleButton>
      )}
      {scene === Scenes.COMPOSING && (
        <ComposerWrapper>
          <ComposerControls>
            <CircleButton
              disabled={!isDurationCanBeDecreased}
              icon="-"
              onClick={onDecreaseBookingDuration}
            />
            <ComposerCurrentEndTime>
              {currentReservationEndTime}
            </ComposerCurrentEndTime>
            <CircleButton
              disabled={!isDurationCanBeIncreased}
              icon="+"
              onClick={onIncreaseBookingDuration}
            />
          </ComposerControls>
          <Button onClick={onConfirmBooking}>
            <FormattedMessage {...messages.confirmBooking} />
          </Button>
          <TransparentButton onClick={onDismissBooking}>
            <FormattedMessage {...messages.dismissBooking} />
          </TransparentButton>
        </ComposerWrapper>
      )}
    </Wrapper>
  );
};

QuickBooking.propTypes = {
  isHidden: PropTypes.bool,
  onConfirmBooking: PropTypes.func.isRequired,
  onDecreaseBookingDuration: PropTypes.func.isRequired,
  onDismissBooking: PropTypes.func.isRequired,
  onIncreaseBookingDuration: PropTypes.func.isRequired,
  onStartBooking: PropTypes.func.isRequired,
  reservationBeingCreated: PropTypes.object,
  resourceMaxReservationDuration: PropTypes.string,
  resourceMinReservationDuration: PropTypes.string,
  resourceSlotSize: PropTypes.string,
};

export default QuickBooking;
