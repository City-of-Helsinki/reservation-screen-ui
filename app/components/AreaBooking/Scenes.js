import React from 'react';
import Confirm from 'components/Confirm';
import ButtonList from 'components/ButtonList';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Title from './H3';
import NormalImg from 'components/Img';
import IconSuccess from './icon-success.svg';
import IconSuccessWarning from './icon-success-warning.svg';

const Wrapper = styled.div`
	display: block;
`;

const IconWrapper = styled.div`
	display: block;
	text-align: center;
`;

const Icon = styled(NormalImg)`
	display: block;
	width: 100px;
	height: auto;
	margin: 0 auto;
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
			title = (
				<Title>
					<FormattedMessage {...messages.confirmTitle} />
				</Title>
			);
			scene = <Confirm items={this.props.items} time={this.props.time} />;
		} else if (this.props.isCancelled) {
			title = (
				<div>
					<IconWrapper>
						<Icon src={IconSuccessWarning} alt="Icon Success" />
					</IconWrapper>
				</div>
			);
			scene = (
				<Title>
					<FormattedMessage {...messages.cancelledTitle} />
				</Title>
			);
		} else {
			title = (
				<Title>
					<FormattedMessage {...messages.bookingTitle} />
				</Title>
			);
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
					{title}
					{scene}
				</Wrapper>
			</div>
		);
	}
}

export default Scenes;
