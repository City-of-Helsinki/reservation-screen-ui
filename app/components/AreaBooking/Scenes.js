import React from 'react';
import Confirm from 'components/Confirm';
import ButtonList from 'components/ButtonList';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Title from './H3';

const Wrapper = styled.div`
	display: block;
`;

class Scenes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let booking = this.props.bookingInProgress;
		let scene;
		let title;

		if (this.props.bookingInProgress) {
			title = <FormattedMessage {...messages.confirmTitle} />;
			scene = <Confirm items={this.props.items} time={this.props.time} />;
		} else {
			title = <FormattedMessage {...messages.bookingTitle} />;
			scene = (
				<ButtonList
					items={this.props.items}
					onButtonClick={this.props.onButtonClick}
				/>
			);
		}

		return (
			<div>
				<Wrapper>
					<Title>{title}</Title>
					{scene}
				</Wrapper>
			</div>
		);
	}
}

export default Scenes;
