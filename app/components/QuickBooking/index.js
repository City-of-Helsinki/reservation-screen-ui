import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import Wrapper from './Wrapper';
import messages from './messages';

const BigButton = styled.button``;
const BigButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-bottom: 24px;

  background: #fff;
  border-radius: 100%;

  &::after {
    display: block;
    content: '+';

    /* The content is a plus sign and in the used font-family it's not
     centered vertically on the line. */
    position: relative;
    top: -16px;

    color: ${props => props.theme.primaryColor};
    font-size: 200px;
  }
`;
const BigButtonLabel = styled.span`
  font-size: 30px;
  text-decoration: underline;
`;

const Scenes = Object.freeze({
  IDLE: 'idle',
});

function getViewScene() {
  return Scenes.IDLE;
}

const QuickBooking = ({ onStartBooking, isHidden }) => {
  const scene = getViewScene();

  return (
    <Wrapper className={toggleDisplayClass(isHidden)}>
      {scene === Scenes.IDLE && (
        <BigButton onClick={onStartBooking}>
          <BigButtonIcon />
          <BigButtonLabel>
            <FormattedMessage {...messages.startBookingNewReservation} />
          </BigButtonLabel>
        </BigButton>
      )}
    </Wrapper>
  );
};

QuickBooking.propTypes = {
  isHidden: PropTypes.bool,
  // resourceMaxReservationTime: PropTypes.number,
  // resourceMinReservationTime: PropTypes.number,
  // resourceSlotSize: PropTypes.number,
  onStartBooking: PropTypes.func.isRequired,
  // onConfirmBooking: PropTypes.func.isRequired,
  // onDismissBooking: PropTypes.func.isRequired,
  // onIncreaseBookingTime: PropTypes.func.isRequired,
  // onDecreaseBookingTime: PropTypes.func.isRequired,
};

export default QuickBooking;
