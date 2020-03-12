import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import dateFormat from 'dateformat';

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

const QuickBooking = ({
  isHidden,
  onConfirmBooking,
  onDecreaseBookingDuration,
  onDismissBooking,
  onIncreaseBookingDuration,
  onStartBooking,
  reservationBeingCreated,
}) => {
  const isCreatingReservation = reservationBeingCreated !== null;
  const scene = getViewScene(isCreatingReservation);
  const currentReservationEndTime =
    isCreatingReservation &&
    dateFormat(new Date(reservationBeingCreated.get('end')), 'HH:MM');

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
            <CircleButton icon="-" onClick={onDecreaseBookingDuration} />
            <ComposerCurrentEndTime>
              {currentReservationEndTime}
            </ComposerCurrentEndTime>
            <CircleButton icon="+" onClick={onIncreaseBookingDuration} />
          </ComposerControls>
          <Button onClick={onConfirmBooking}>Tee varaus</Button>
          <TransparentButton onClick={onDismissBooking}>
            Peruuta varaus
          </TransparentButton>
        </ComposerWrapper>
      )}
    </Wrapper>
  );
};

QuickBooking.propTypes = {
  isHidden: PropTypes.bool,
  // resourceMaxReservationTime: PropTypes.number,
  // resourceMinReservationTime: PropTypes.number,
  // resourceSlotSize: PropTypes.number,
  onConfirmBooking: PropTypes.func.isRequired,
  onDecreaseBookingDuration: PropTypes.func.isRequired,
  onDismissBooking: PropTypes.func.isRequired,
  onIncreaseBookingDuration: PropTypes.func.isRequired,
  onStartBooking: PropTypes.func.isRequired,
  reservationBeingCreated: PropTypes.object,
};

export default QuickBooking;
