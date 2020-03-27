/* eslint-disable react/prop-types */
/* eslint-disable react/require-render-return */
import React from 'react';
import { withTheme } from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class MyComponent extends React.Component {
  render() {
    // eslint-disable-next-line no-console
    console.log('Current theme: ', this.props.theme);
    // ...
  }
}

export default withTheme(MyComponent);
