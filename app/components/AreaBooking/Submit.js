import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SubmitButton = styled(BasicButton)`
	background-color: #63e080;
	border: 0;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
	padding-left: 4rem;
	padding-right: 4rem;
	line-height: 4.4rem;
	border-radius: 2.2rem;
	font-size: 24px;
	transition: 0.2s opacity linear 0.2s;

	&[disabled] {
		opacity: 0.4;
		pointer-events: none;
	}
`;

class Submit extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SubmitButton
					disabled={this.props.disabled}
					className={this.props.active}
					onClick={this.props.onSubmitClick}
				>
					<FormattedMessage {...messages.submitButton} />
				</SubmitButton>
			</div>
		);
	}
}

export default Submit;
