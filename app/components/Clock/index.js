/* eslint-disable react/prop-types */
/**
 *
 * Clock.js
 *
 * A clock.
 */

import React from 'react';
import styled from 'styled-components';
import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import Wrapper from './Wrapper';

const Span = styled.span`
  font-size: 4vw;
`;

// eslint-disable-next-line react/prefer-stateless-function
class Clock extends React.Component {
  render() {
    const hours = this.props.date.getHours();
    const mins = this.props.date.getMinutes();

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
