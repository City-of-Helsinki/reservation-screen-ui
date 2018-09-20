import React from 'react';
import Confirm from 'components/Confirm';
import ButtonList from 'components/ButtonList';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: block;
`;

class Scenes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.status,
			items: props.items,
		};
	}

	render() {
		let booking = this.state.isBooking;
		let scene;

		if (this.state.status) {
			scene = (
				<Confirm
					items={this.state.items}
					// onButtonClick={this.switchButtonState}
				/>
			);
		} else {
			scene = (
				<ButtonList
					items={this.state.items}
					onButtonClick={this.props.onButtonClick}
				/>
			);
		}

		return (
			<div>
				<Wrapper>{scene}</Wrapper>
			</div>
		);
	}
}

export default Scenes;
