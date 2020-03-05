/* eslint-disable react/prop-types */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from './buttons';

const Wrapper = styled.div`
  display: block;
`;

function Submit(props) {
  const link = (
    <StyledButton onClick={props.onClick} disabled={props.disabled}>
      {Children.toArray(props.children)}
    </StyledButton>
  );

  return <Wrapper>{link}</Wrapper>;
}

Submit.propTypes = {
  children: PropTypes.any,
};

export default Submit;
