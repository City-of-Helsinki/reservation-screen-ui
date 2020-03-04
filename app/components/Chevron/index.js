/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ChevronLeft from './icon-chevron-left.png';
import ChevronUp from './icon-chevron-up.png';

const Wrapper = styled.i`
  display: inline-block;
  /* stylelint-disable-next-line */
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translate(0, 2px);
  transition: all 0.5s ease;
  &:before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(${ChevronLeft});
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.up {
    transform: translate(0, 4px) scaleY(1);
    margin-left: 10px;
    &:before {
      background-image: url(${ChevronUp});
    }
  }

  &.down {
    transform: translate(0, -2px) scaleY(-1);
    margin-left: 10px;
    &:before {
      background-image: url(${ChevronUp});
    }
  }
`;

function Chevron(props) {
  return <Wrapper className={props.className} />;
}

export default Chevron;
