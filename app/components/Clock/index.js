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
import P from './P';

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
        <span>
          {hours < 10 ? '0' : ''}
          {hours}:
          {mins < 10 ? '0' : ''}
          {mins}
        </span>
      </Wrapper>
    );
  }
}

export default Clock;
