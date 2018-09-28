import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import { FormattedMessage, defineMessages } from 'react-intl';
import H3 from 'components/H3';
import Icon from 'components/Icon';

const messages = defineMessages({
	cancel: {
		id: 'boilerplate.components.SceneCancel.link.cancel',
		defaultMessage: 'Takaisin alkuun',
	},
	title: {
		id: 'boilerplate.components.SceneCancel.title',
		defaultMessage: 'Varaus peruttu',
	},
});

const Wrapper = styled.div`
	display: block;
`;

class SceneCancel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Wrapper>
				<Icon />
				<H3>
					<FormattedMessage {...messages.title} />
				</H3>
				<HelperLink onHelperLinkClick={this.props.cancelClick}>
					<FormattedMessage {...messages.cancel} />
				</HelperLink>
			</Wrapper>
		);
	}
}

export default SceneCancel;
