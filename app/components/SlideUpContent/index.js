import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';

const ShowMoreButton = styled(ButtonBase)`
	background: transparent;
	white-space: nowrap;
	font-size: 18px;
	margin: 20px auto;
`;

const Wrapper = styled.div`
	text-align: center;
	div {
		text-align: left;
		overflow-y: scroll;
		max-height: 0;
		transition: max-height 0.5s ease-in-out;
		&.slide-up {
			max-height: 50vh;
		}
		&.slide-down {
			max-height: 0;
		}
	}
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
		// this.checkSlideState(this.props.visible);
	}

	checkSlideState = bool => {
		let c = '';
		bool ? (c = 'slide-up') : (c = 'slide-down');

		this.setState({ cssClass: c });
	};

	render() {
		return (
			<Wrapper>
				<ShowMoreButton onClick={this.props.onButtonClick}>
					<FormattedMessage {...messages.showMore} />
				</ShowMoreButton>

				<div className={this.state.cssClass}>
					{this.props.content}
					{this.props.content}
				</div>
			</Wrapper>
		);
	}
}

export default SlideUpContent;
