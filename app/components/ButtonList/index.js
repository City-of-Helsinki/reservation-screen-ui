import React from 'react';
import BasicButton from 'components/BasicButton';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import BookingButton from './BookingButton';

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: this.props.active,
    };
  }

  render() {
    return (
      <Wrapper>
        {this.props.items.map((item, index) => (
          <BookingButton
            id={item.id}
            className={item.active ? 'active' : ''}
            onClick={e => this.props.onButtonClick(e, index)}
            key={item.id}
          >
            Kello {item.text} saakka
          </BookingButton>
        ))}
      </Wrapper>
    );
  }
}

export default ButtonList;
