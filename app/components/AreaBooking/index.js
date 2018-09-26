import React from 'react';
import Wrapper from './Wrapper';
import { ThemeProvider } from 'styled-components';
import Submit from 'components/Submit';
import LocaleToggle from 'containers/LocaleToggle';
import Confirm from 'components/Confirm';
import Scene from 'components/Scene';
import Timer from 'components/Timer';
import {
	toggleScene,
	switchSubmitButtonState,
	switchButtonState,
	cancelBooking,
	resetScene,
	verifyBooking,
	resetButtons,
} from './actions';

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
			items: [
				{ id: 'button-1', text: '11:00', active: false },
				{ id: 'button-2', text: '13:00', active: false },
				{ id: 'button-3', text: '16:00', active: false },
			],
		};

		this.switchButtonState = switchButtonState.bind(this);
		this.resetButtons = resetButtons.bind(this);
		this.verifyBooking = verifyBooking.bind(this);
		this.resetScene = resetScene.bind(this);
		this.cancelBooking = cancelBooking.bind(this);
		this.toggleScene = toggleScene.bind(this);
		this.switchSubmitButtonState = switchSubmitButtonState.bind(this);
	}

	render() {
		return (
			<Wrapper>
				<div className="b-scene-buttons">
					<LocaleToggle />
					{this.state.view === 'CTA' ? (
						<Timer onTimesUp={this.resetScene} />
					) : (
						''
					)}
					<Scene
						view={this.state.view}
						items={this.state.items}
						bookingInProgress={this.state.bookingInProgress}
						onButtonClick={this.switchButtonState}
						time={this.state.timeframe}
						isCancelled={this.state.isCancelled}
					/>
					<Submit
						onSubmitClick={this.toggleScene}
						onCancelClick={this.cancelBooking}
						onResetClick={this.resetScene}
						onVerifyClick={this.verifyBooking}
						disabled={this.state.disabled}
						buttonVisible={this.state.buttonVisible}
						view={this.state.view}
					/>

					<LinkReset />
				</div>
			</Wrapper>
		);
	}
}

export default AreaBooking;
