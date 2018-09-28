import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import Submit from 'components/Submit';
import { FormattedMessage, defineMessages } from 'react-intl';
import P from 'components/P';
import Timer from 'components/Timer';

const messages = defineMessages({
	cancel: {
		id: 'boilerplate.components.SceneAction.link.cancel',
		defaultMessage: 'Peruuta varaus',
	},
	book: {
		id: 'boilerplate.components.SceneAction.link.book',
		defaultMessage: 'Varaa',
	},
	title: {
		id: 'boilerplate.components.SceneAction.link.title',
		defaultMessage: 'Vahvista varaus',
	},
	startsAt: {
		id: 'boilerplate.components.SceneAction.link.title',
		defaultMessage: 'Varauksesi alkaa {br} kello startTime',
	},
	endsAt: {
		id: 'boilerplate.components.SceneAction.link.title',
		defaultMessage: 'Varauksesi loppuu {br} kello endTime',
	},
});

const Wrapper = styled.div`
	display: block;
`;

const LinkWrapper = styled.div`
	color: #f00;
`;

const H2 = styled.h2`
	font-size: 48px;
	text-align: center;
`;

class SceneAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
		};
	}

	confirmClick = () => {
		console.log('confirm clicked!');
	};

	cancelClick = () => {
		console.log('cancel clicked!');
	};

	render() {
		return (
			<Wrapper>
				<Timer />
				<H2>
					<FormattedMessage {...messages.title} />
				</H2>
				<P>
					<FormattedMessage
						{...messages.startsAt}
						values={{ br: <br /> }}
					/>
				</P>

				<P>
					<FormattedMessage
						{...messages.endsAt}
						values={{ br: <br /> }}
					/>
				</P>

				<Submit onClick={this.confirmClick}>
					<FormattedMessage {...messages.book} />
				</Submit>
				<LinkWrapper>
					<HelperLink onHelperLinkClick={this.cancelClick}>
						<FormattedMessage {...messages.cancel} />
					</HelperLink>
				</LinkWrapper>
			</Wrapper>
		);
	}
}

export default SceneAction;
