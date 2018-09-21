import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const StyledButton = styled(BasicButton)`
	background-color: #63e080;
	border: 0;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
	padding-left: 4rem;
	padding-right: 4rem;
	line-height: 4.4rem;
	border-radius: 2.2rem;
	font-size: 24px;
	transition: 0.2s opacity linear 0.2s;

	margin-bottom: 30px;

	&[disabled] {
		opacity: 0.4;
		pointer-events: none;
	}
`;

const CancelBtn = styled.div`
	display: block;
	color: red;
	text-decoration: none;
`;

function CancelLink(props) {
	if (!props.visible) {
		return null;
	} else {
		return (
			<CancelBtn onClick={props.onCancelClick}>
				<FormattedMessage {...messages.cancel} />
			</CancelBtn>
		);
	}
}

function SubmitButton(props) {
	if (!props.visible) {
		return null;
	} else {
		return (
			<StyledButton
				onClick={props.onSubmitClick}
				disabled={props.disabled}
			>
				<FormattedMessage {...messages.submitButton} />
			</StyledButton>
		);
	}
}

class Submit extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SubmitButton
					visible={this.props.isCancelled}
					disabled={this.props.disabled}
					className={this.props.active}
					onSubmitClick={this.props.onSubmitClick}
				>
					<FormattedMessage {...messages.submitButton} />
				</SubmitButton>
				<CancelLink
					visible={this.props.cancel}
					onCancelClick={this.props.onCancelClick}
				/>
			</div>
		);
	}
}

export default Submit;
