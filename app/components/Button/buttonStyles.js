import { css } from 'styled-components';

const color = 'white';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 16px 35px;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: ${color};
  line-height: 1;

  background: black;

  &:active,
  &.active {
    background: white;
    color: black;
  }
`;

export default buttonStyles;
