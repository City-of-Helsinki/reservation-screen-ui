import { css } from 'styled-components';

const color = 'black';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 2em;
  text-decoration: none;
  /* stylelint-disable-next-line */
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  border: 2px solid black;
  /* stylelint-disable-next-line */
  border-radius: 25%;

  color: ${color};
  line-height: 3rem;
  /* stylelint-disable-next-line */
  border-radius: 1.5rem;
  background: white;

  &:active,
  &.active {
    background: black;
    color: white;
  }
`;

export default buttonStyles;
