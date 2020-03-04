/* eslint-disable react/prop-types */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chevron from 'components/Chevron';

const Wrapper = styled.div`
  display: block;

  &.helperlink--btn {
    display: inline-block;
    border: 1px solid #191919;
    line-height: 4rem;
    border-radius: 2rem;
    padding: 0 2rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;
const Link = styled.div`
  display: block;
`;

function HelperLink(props) {
  const link = (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link onClick={props.onHelperLinkClick}>
      <Chevron />
      {Children.toArray(props.children)}
    </Link>
  );

  return <Wrapper className={props.className}>{link}</Wrapper>;
}

HelperLink.propTypes = {
  children: PropTypes.any,
};

export default HelperLink;
