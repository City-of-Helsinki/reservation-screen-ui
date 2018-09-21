import React from 'react';
import ButtonList from './ButtonList';
import Wrapper from './Wrapper';
import Title from './H3';
import { ThemeProvider } from 'styled-components';
import Submit from './Submit';
import LocaleToggle from 'containers/LocaleToggle';
import Confirm from 'components/Confirm';
import { toggleScene, switchSubmitButtonState, cancelBooking } from './actions';
import Scenes from './Scenes';

/* eslint-disable react/prefer-stateless-function */

class AreaBooking extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			activeButton: '',
			bookingInProgress: false,
			timeframe: '',
			items: [
				{ id: 'button-1', text: '11:00', active: false },
				{ id: 'button-2', text: '13:00', active: false },
				{ id: 'button-3', text: '16:00', active: false },
			],
		};

		this.switchButtonState = this.switchButtonState.bind(this);
		this.verifyBooking = this.verifyBooking.bind(this);
		// imported functions
		this.cancelBooking = cancelBooking.bind(this);
		this.toggleScene = toggleScene.bind(this);
		this.switchSubmitButtonState = switchSubmitButtonState.bind(this);
	}

	switchButtonState(evt, btnIndex) {
		let btns = this.state.items;
		let clickedBtn = btns[btnIndex];
		let filteredButtons = btns.filter(function(btn, i) {
			if (i !== btnIndex) {
				return btn;
			}
		});

		filteredButtons.map(item => (item.active = false));
		btns[btnIndex].active = !btns[btnIndex].active ? true : false;

		this.setState({
			timeframe: clickedBtn.text,
		});
		this.switchSubmitButtonState(clickedBtn);
	}

	verifyBooking() {
		console.log('verified');
	}

	render() {
		return (
			<Wrapper>
				<div>
					<LocaleToggle />
					<Scenes
						items={this.state.items}
						bookingInProgress={this.state.bookingInProgress}
						onButtonClick={this.switchButtonState}
						time={this.state.timeframe}
					/>
					<Submit
						disabled={this.state.disabled}
						cancel={this.state.bookingInProgress}
						onSubmitClick={this.toggleScene}
						onCancelClick={this.cancelBooking}
					/>
				</div>
			</Wrapper>
		);
	}
}

export default AreaBooking;
