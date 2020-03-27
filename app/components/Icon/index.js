/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Img from 'components/Img';
import IconSuccess from './icon-success.svg';
import IconCancelled from './icon-warning.svg';

const IconWrapper = styled(Img)`
  display: block;
  width: 100px;
  height: auto;
  margin: 0 auto;
`;

function Icon(props) {
  return (
    <div>
      <IconWrapper
        src={props.verified ? IconSuccess : IconCancelled}
        alt="Icon"
      />
    </div>
  );
}

export default Icon;
