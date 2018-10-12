import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from './Wrapper';
import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';

const ShowMoreButton = styled(ButtonBase)`
	background: transparent;
	white-space: nowrap;
	font-size: 18px;
	margin: 20px auto;
`;

const Div = styled.div`
	font-size: 18px;
	line-height: 24px;
`;

class SlideUpContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cssClass: 'slide-down',
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			this.checkSlideState(this.props.visible);
		}
	}

	checkSlideState = bool => {
		let slideClass = '';
		bool ? (slideClass = 'slide-up') : (slideClass = 'slide-down');

		this.setState({ cssClass: slideClass });
	};

	render() {
		return (
			<Wrapper className={this.state.cssClass}>
				<ShowMoreButton onClick={this.props.onButtonClick}>
					{!this.props.visible ? (
						<FormattedMessage {...messages.showMore} />
					) : (
						<FormattedMessage {...messages.hideMore} />
					)}
				</ShowMoreButton>

				<Div className={this.state.cssClass}>
					{this.props.content}
					{this.props.content}
				</Div>
			</Wrapper>
		);
	}
}

export default SlideUpContent;
