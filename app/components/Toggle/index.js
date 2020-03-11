/* eslint-disable react/prop-types */
/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  padding-left: 0;
`;

const Li = styled.li`
  color: black;
  text-align: center;
  text-decoration: underline;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

function Toggle(props) {
  let content = <Li>--</Li>;

  // If we have items, render them
  if (props.values) {
    content = props.values.filter(value => props.value !== value).map(value => (
      <Li
        key={value}
        lang={value}
        value={value}
        message={props.messages[value].defaultMessage}
        onClick={props.onLangClick}
      >
        {props.messages[value].defaultMessage}
      </Li>
    ));
  }

  return <Ul>{content}</Ul>;
}

Toggle.propTypes = {
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
