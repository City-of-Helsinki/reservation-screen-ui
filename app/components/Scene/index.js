import React from 'react';
import Confirm from 'components/Confirm';
import ButtonList from 'components/ButtonList';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import NormalImg from 'components/Img';
import IconSuccess from './icon-success.svg';
import IconSuccessWarning from './icon-success-warning.svg';
import { Wrapper, IconWrapper, Title, Icon } from './styled-elements.js';

class Scene extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let scene;
		let title;
		let view = this.props.view;
		switch (view) {
			case 'CTA':
				title = (
					<Title>
						<FormattedMessage {...messages.confirmTitle} />
					</Title>
				);
				scene = (
					<Confirm items={this.props.items} time={this.props.time} />
				);
				break;

			case 'CANCELLED':
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
				break;
			case 'VERIFIED':
				title = (
					<div>
						<IconWrapper>
							<Icon src={IconSuccess} alt="Icon Success" />
						</IconWrapper>
					</div>
				);
				scene = (
					<Title>
						<FormattedMessage {...messages.verifiedTitle} />
					</Title>
				);
				break;
			default:
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
			<div className="c-scene-buttons">
				<Wrapper>
					{title}
					{scene}
				</Wrapper>
			</div>
		);
	}
}

export default Scene;
