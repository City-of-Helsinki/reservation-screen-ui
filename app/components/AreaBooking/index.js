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

class AreaBooking extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			activeButton: '',
			buttonVisible: true,
			view: 'INIT',
			timeframe: '',
		};
	}

	render() {
		return (
			<Wrapper>
				<div>
					<LocaleToggle />
					<SceneCancel />
				</div>
			</Wrapper>
		);
	}
}

export default AreaBooking;
