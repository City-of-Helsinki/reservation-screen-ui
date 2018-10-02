import React from 'react';
import BasicButton from 'components/BasicButton';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import BookingButton from './BookingButton';
import FormattedTime from 'components/FormattedTime';

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper className="c-buttonlist">
        {this.props.freeSlots.map((slot, index) => (
          <BookingButton
            id={slot.begin.getTime()}
            className={
              this.props.selectedSlot &&
              slot.begin.getTime() == this.props.selectedSlot.getTime()
                ? 'active'
                : ''
            }
            onClick={e => this.props.onButtonClick(slot.begin)}
            key={slot.begin.getTime()}
          >
            <FormattedTime date={slot.begin} /> -{' '}
            <FormattedTime date={slot.end} />
          </BookingButton>
        ))}
      </Wrapper>
    );
  }
}

export default ButtonList;
