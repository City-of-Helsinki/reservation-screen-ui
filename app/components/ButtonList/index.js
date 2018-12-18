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

    this.state = {
      active: false,
    };
  }

  onSlotClick(slot) {
    this.props.onButtonClick(slot);

    this.setState({
      // active: !this.state.active,
    });
  }

  render() {
    return (
      <Wrapper>
        {this.props.freeSlots.map((slot, index) => (
          <BookingButton
            id={slot.end.getTime()}
            className={
              this.state.active &&
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
