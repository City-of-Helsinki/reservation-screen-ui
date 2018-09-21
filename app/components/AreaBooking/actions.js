module.exports = {
	toggleScene: function(event) {
		if (this.state.bookingInProgress) {
			this.verifyBooking();
		} else {
			this.setState({
				bookingInProgress: true,
			});
		}
	},
	cancelBooking: function(event) {
		this.setState({
			bookingInProgress: false,
			activeButton: '',
		});
		this.switchButtonState(null, 0);
	},
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
	},
};
