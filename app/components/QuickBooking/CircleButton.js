import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const VARIANTS = ['normal', 'superBig'];

const isNormal = rules => props => (props.variant === VARIANTS[0] ? rules : '');
const isSuperBig = rules => props =>
  props.variant === VARIANTS[1] ? rules : '';

const Button = styled.button`
  &:disabled {
    opacity: 0.2;
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
  border-radius: 100%;

  ${isSuperBig(css`
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
  `)};

  ${isNormal(css`
    width: 72px;
    height: 72px;
    margin-bottom: 0;
  `)};

  &::after {
    content: '${props => props.icon}';

    /* The content is a plus sign and in the used font-family it's not
     centered vertically on the line. */
    position: relative;

    color: ${props => props.theme.primaryColor};

    ${isSuperBig(css`
      top: -16px;
      font-size: 200px;
    `)};

    ${isNormal(css`
      top: -2px;
      font-size: 50px;
    `)};
  }
`;
const Label = styled.span`
  text-decoration: underline;

  ${isSuperBig(css`
    font-size: ${props => props.theme.fontSize[2]};
  `)};

  ${isNormal(css`
    font-size: ${props => props.theme.fontSize[4]};
  `)};
`;

const CircleButton = ({
  children,
  icon = '+',
  variant = VARIANTS[0],
  ...rest
}) => (
  <Button variant={variant} {...rest}>
    <Icon icon={icon} variant={variant} />
    {children && <Label variant={variant}>{children}</Label>}
  </Button>
);

CircleButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(VARIANTS),
};

export default CircleButton;
