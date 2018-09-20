module.exports = {
	toggleScene: function(event) {
		if (this.state.isBooking) {
			this.verifyBooking();
		} else {
			this.setState({
				isBooking: true,
			});
		}
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
