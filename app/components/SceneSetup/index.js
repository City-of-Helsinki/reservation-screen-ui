import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
`;

// eslint-disable-next-line react/prefer-stateless-function
class SceneSetup extends React.Component {
  render() {
    return (
      <Wrapper>
        <h3>Setup required</h3>
        <p>
          To open reservation screen properly you will need to set resourceId
          and ensure that TOKEN is discoverable in environment variables.
        </p>
        <p>Example:</p>
        <p>http://localhost/?resourceId=123456</p>
      </Wrapper>
    );
  }
}

export default SceneSetup;
