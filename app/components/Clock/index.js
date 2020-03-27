import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import Wrapper from './Wrapper';

const Span = styled.span`
  font-size: 4vw;
`;

const Clock = ({ date, className }) => {
  const hours = date.getHours();
  const mins = date.getMinutes();

  return (
    <Wrapper className={toggleDisplayClass(className)}>
      <Span>
        {hours < 10 ? '0' : ''}
        {hours}:
        {mins < 10 ? '0' : ''}
        {mins}
      </Span>
    </Wrapper>
  );
};

Clock.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Clock;
