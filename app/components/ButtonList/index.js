import React from 'react';
import BasicButton from 'components/BasicButton';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import BookingButton from './BookingButton';
import FormattedTime from 'components/FormattedTime';
import messages from './messages';

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  onSlotClick(slot) {
    this.props.onButtonClick(slot);
  }

  render() {
    return (
      <Wrapper>
        {this.props.freeSlots.map((slot, index) => (
          <BookingButton
            id={slot.end.getTime()}
            className={
              this.props.selectedSlot &&
              slot.end.getTime() == this.props.selectedSlot.end.getTime()
                ? 'active'
                : ''
            }
            onClick={e => this.onSlotClick(slot)}
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
