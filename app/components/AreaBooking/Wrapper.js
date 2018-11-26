import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-items: center;
  width: 50%;
  background-color: ${props => props.theme.secondaryColor};
  padding: 5%;
  background-image: url(${props => props.theme.bgImage});
  background-repeat: repeat-y;
  background-size: auto 100%;
  background-position: 0 0;
`;

export const Div = styled.div`
  width: 100%;
  text-align: center;
`;
