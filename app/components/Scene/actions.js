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
			isCancelled: true,
			onConfirmed: true,
		});
		this.resetButtons();
	},
	resetBooking: function(event) {
		this.setState({
			isCancelled: false,
			onConfirmed: false,
		});
		this.resetButtons();
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
