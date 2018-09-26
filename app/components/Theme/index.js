import React from 'react';
import { withTheme } from 'styled-components';

class MyComponent extends React.Component {
	render() {
		console.log('Current theme: ', this.props.theme);
		// ...
	}
}

export default withTheme(MyComponent);
