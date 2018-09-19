import React from 'react';
import ButtonList from './ButtonList';
import Wrapper from './Wrapper';
import Title from './H3';
import { ThemeProvider } from 'styled-components';
import Submit from './Submit';
import LocaleToggle from 'containers/LocaleToggle';

import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */

class AreaBooking extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			header: 'Varaa tila',
			activeButton: '',
			activeClass: 'btn-active',
			items: [
				{ id: 'button-1', text: '11:00', active: false },
				{ id: 'button-2', text: '13:00', active: false },
				{ id: 'button-3', text: '16:00', active: false },
			],
		};

		this.switchButtonState = this.switchButtonState.bind(this);
		this.toggleScene = this.toggleScene.bind(this);
		this.verifyBooking = this.verifyBooking.bind(this);
	}

	switchSubmitButtonState(btn) {
		if (btn == this.state.activeButton) {
			this.setState({
				disabled: true,
				activeButton: '',
			});
			return;
		}

		this.setState({
			disabled: false,
			activeButton: btn,
		});
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
		this.switchSubmitButtonState(clickedBtn);
	}

	toggleScene(evt, action) {
		console.log('toggle');
		switch (action) {
			case 'CANCEL':
				return action;
			case 'VERIFY':
				return action;
		}
	}

	verifyBooking() {
		console.log('verified');
	}

	render() {
		return (
			<Wrapper>
				<div>
					<LocaleToggle />
					<Title>
						<FormattedMessage {...messages.bookingTitle} />
					</Title>
					<ButtonList
						items={this.state.items}
						onButtonClick={this.switchButtonState}
					/>
					<Submit
						disabled={this.state.disabled}
						onSubmitClick={this.toggleScene}
					/>
				</div>
			</Wrapper>
		);
	}
}

export default AreaBooking;
