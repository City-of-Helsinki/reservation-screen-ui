import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 5%;
  background-color: ${props => props.theme.primaryColor};

  &.hide-on-toggle,
  .hide-on-toggle {
    display: none;
  }
`;

export default Wrapper;
