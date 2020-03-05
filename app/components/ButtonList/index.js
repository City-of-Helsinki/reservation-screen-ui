/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FormattedTime from 'components/FormattedTime';
import Wrapper from './Wrapper';
import BookingButton from './BookingButton';
import messages from './messages';

class ButtonList extends React.Component {
  onSlotClick(slot) {
    this.props.onButtonClick(slot);
  }

  render() {
    return (
      <Wrapper>
        {this.props.freeSlots.map(slot => (
          <BookingButton
            id={slot.end.getTime()}
            className={
              this.props.selectedSlot &&
              slot.end.getTime() === this.props.selectedSlot.end.getTime()
                ? 'active'
                : ''
            }
            onClick={() => this.onSlotClick(slot)}
            key={slot.end.getTime()}
          >
            <FormattedTime date={slot.end} />
            <span>
              {' '}
              <FormattedMessage {...messages.until} />
            </span>
          </BookingButton>
        ))}
      </Wrapper>
    );
  }
}

export default ButtonList;
