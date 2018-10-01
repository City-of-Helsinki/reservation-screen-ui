import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import { ThemeProvider } from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';
import Confirm from 'components/Confirm';
import Timer from 'components/Timer';

import SceneStart from 'components/SceneStart';
import SceneCancel from 'components/SceneCancel';
import SceneAction from 'components/SceneAction';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */

const SceneToggler = (props) =>{
	switch(props.scene){
		case 'ACTION':
			return <SceneAction onClick={props.onClick} />;
		default:
			return <SceneStart />
	}
}

class AreaBooking extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			view: 'START'
		};
	}

	confirmClick = () => {
		console.log('confirm clicked!');
		this.setState({
			view: 'ACTION'
		})
	};

	render() {
		return (
			<Wrapper>
				<div>
					<LocaleToggle />
					<SceneToggler scene={this.state.view} onClick={this.confirmClick} />
				</div>
			</Wrapper>
		);
	}
}

export default AreaBooking;
