/**
 *
 * Clock.js
 *
 * A clock.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import clockStyles from './clockStyles';
import styled from 'styled-components';

const Span = styled.span`
  font-size: 4vw;
`;

class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let hours = this.props.date.getHours();
    let mins = this.props.date.getMinutes();

    return (
      <Wrapper className="c-clock">
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
