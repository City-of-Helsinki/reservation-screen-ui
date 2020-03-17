import styled from 'styled-components';

const TransparentButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 16px 35px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${props => props.theme.fontSize[3]};
  font-weight: 500;
  line-height: 1;
  text-decoration: underline;
`;

export default TransparentButton;
