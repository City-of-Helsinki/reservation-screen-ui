module.exports = {
	toggleScene: function(event) {
		if (this.state.view === 'CTA') {
			this.verifyBooking();
		} else {
			this.setState({
				view: 'CTA',
			});
		}
	},
	cancelBooking: function(event) {
		this.setState({
			view: 'CANCELLED',
			buttonVisible: false,
			timeframe: '',
		});
	},
	verifyBooking: function(event) {
		this.setState({
			view: 'VERIFIED',
			buttonVisible: false,
		});
	},
	resetScene: function() {
		let btns = this.state.items;
		btns.map(item => (item.active = false));

		this.setState({
			disabled: true,
			activeButton: '',
			buttonVisible: true,
			view: '',
			timeframe: '',
		});
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

		// TODO: Change to the actual booked time slot
		this.setState({
			timeframe: clickedBtn.text,
		});
		this.switchSubmitButtonState(clickedBtn);
	},
};
