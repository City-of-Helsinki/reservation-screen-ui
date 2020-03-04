import styled from 'styled-components';

const BasicButton = styled.button`
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
  font-weight: normal;
  font-size: 30px;
  border: 2px solid black;
  color: black;
  line-height: 4rem;
  /* stylelint-disable-next-line */
  border-radius: 2rem;

  background: white;
  &:active,
  &.active {
    background: black;
    color: white;
  }
`;

export default BasicButton;
