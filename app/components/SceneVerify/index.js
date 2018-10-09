import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import { FormattedMessage, defineMessages } from 'react-intl';
import H3 from 'components/H3';
import Icon from 'components/Icon';

const messages = defineMessages({
	cancel: {
		id: 'boilerplate.components.SceneVerify.link.cancel',
		defaultMessage: 'Valmis',
	},
	title: {
		id: 'boilerplate.components.SceneVerify.title',
		defaultMessage: 'Varaus onnistui!',
	},
});

const Wrapper = styled.div`
	display: block;
`;

class SceneVerify extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Wrapper>
				<Icon verified />
				<H3>
					<FormattedMessage {...messages.title} />
				</H3>
				<HelperLink onHelperLinkClick={this.props.onButtonClick}>
					<FormattedMessage {...messages.cancel} />
				</HelperLink>
			</Wrapper>
		);
	}
}

export default SceneVerify;
