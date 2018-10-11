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
		transition: max-height 0.3s ease-in-out;

		&.slide-up {
			max-height: 80vh;
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
			cssclass: 'slide-down',
		};
	}

	toggleContent = () => {
		console.log(this.state.cssclass);
		let toggleClass =
			this.state.cssclass === 'slide-down' ? 'slide-up' : 'slide-down';
		this.setState({ cssclass: toggleClass });
	};
	render() {
		return (
			<Wrapper>
				<ShowMoreButton onClick={() => this.toggleContent()}>
					<FormattedMessage {...messages.showMore} />
				</ShowMoreButton>

				<div className={this.state.cssclass}>{this.props.content}</div>
			</Wrapper>
		);
	}
}

export default SlideUpContent;
