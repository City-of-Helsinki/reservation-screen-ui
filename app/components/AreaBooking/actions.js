module.exports = {
	toggleScene: function(event) {
		if (this.state.bookingInProgress) {
			this.verifyBooking();
		} else {
			this.setState({
				view: 'CTA',
				bookingInProgress: true,
			});
		}
	},
	cancelBooking: function(event) {
		console.log('cancelBooking');
		this.setState({
			view: 'CANCELLED',
			bookingInProgress: false,
			buttonVisible: false,
			timeframe: '',
		});
	},
	verifyBooking: function(event) {
		console.log('verifyBooking!');
		this.setState({
			view: 'VERIFIED',
			bookingInProgress: false,
			isVerified: true,
			buttonVisible: false,
		});
	},
	resetScene: function(event) {
		this.setState({
			view: '',
			bookingInProgress: false,
		});
		this.resetButtons();
	},
	resetButtons: function(event) {
		this.setState({
			activeButton: '',
			disabled: true,
			timeframe: '',
			buttonVisible: true,
		});

		let btns = this.state.items;
		btns.map(item => (item.active = false));
	},
	switchSubmitButtonState: function(btn) {
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
	},
	switchButtonState: function(evt, btnIndex) {
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
	},
};
