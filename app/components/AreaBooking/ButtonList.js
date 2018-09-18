import React from 'react';
import BasicButton from 'components/BasicButton';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BookingButton = styled(BasicButton)`
  margin: 0 auto 1rem;
  display: block;
  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeButton: this.props.active,
    };
  }

  componentDidMount() {}

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

ButtonList.propTypes = {
  items: PropTypes.array,
  onButtonClick: PropTypes.func,
};

export default ButtonList;
