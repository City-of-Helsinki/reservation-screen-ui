import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from './Wrapper';
import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';
import P from 'components/P';
import Chevron from 'components/Chevron';

const ShowMoreButton = styled(ButtonBase)`
	background: transparent;
	white-space: nowrap;
	font-size: 18px;
	margin: 20px auto;
`;

const Div = styled.div`
	font-size: 18px;
	line-height: 24px;

	p:empty {
		display: none;
	}
`;

class SlideUpContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cssClass: 'slide-down',
			items: [],
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible) {
			this.checkSlideState(this.props.visible);
		}
	}

	componentWillMount() {
		let textBlock = this.props.content;
		let stylizedTextBlock = textBlock.replace(/(?:\r\n|\r|\n)/g, '<br>');
		let htmlText = textBlock.split(/(?:\r\n|\r|\n)/g);
		let paragraphs = htmlText.length;
		this.setState({ items: htmlText });
	}

	checkSlideState = bool => {
		let slideClass = '';
		bool ? (slideClass = 'slide-up') : (slideClass = 'slide-down');

		this.setState({ cssClass: slideClass });
	};

	render() {
		let textItems = this.state.items;

		return (
			<Wrapper className={this.state.cssClass}>
				<ShowMoreButton onClick={this.props.onButtonClick}>
					{!this.props.visible ? (
						<span>
							<FormattedMessage {...messages.showMore} />
							<Chevron className="up" />
						</span>
					) : (
						<span>
							<FormattedMessage {...messages.hideMore} />
							<Chevron className="down" />
						</span>
					)}
				</ShowMoreButton>

				<Div className={this.state.cssClass}>
					{textItems.map(item => <P>{item}</P>)}
				</Div>
			</Wrapper>
		);
	}
}

export default SlideUpContent;
