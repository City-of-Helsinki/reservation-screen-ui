/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

const Li = styled.li`
  margin-left: 1rem;
  color: black;
  text-align: center;
  ${({ active }) =>
    active &&
    `
    color: silver;
  `};
`;

function Toggle(props) {
  let content = <Li>--</Li>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <Li
        key={value}
        lang={value}
        value={value}
        message={props.messages[value].defaultMessage}
        onClick={props.onLangClick}
        active={props.value === value}
      >
        {props.messages[value].defaultMessage}
      </Li>
    ));
  }

  return <Ul>{content}</Ul>;
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
