/**
 *
 * Clock.js
 *
 * A clock.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import styled from 'styled-components';
import { toggleDisplayClass } from 'utils/toggleDisplayClass';

const Span = styled.span`
  font-size: 4vw;
`;

class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hours = this.props.date.getHours();
    let mins = this.props.date.getMinutes();

    return (
      <Wrapper className={toggleDisplayClass(this.props.className)}>
        <Span>
          {hours < 10 ? '0' : ''}
          {hours}:
          {mins < 10 ? '0' : ''}
          {mins}
        </Span>
      </Wrapper>
    );
  }
}

export default Clock;
