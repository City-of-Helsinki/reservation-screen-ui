import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { StyledButton, CancelButton, ResetButton } from './buttons';

function CancelLink(props) {
	if (!props.visible) {
		return null;
	} else {
		return (
			<CancelButton onClick={props.onCancelClick}>
				<FormattedMessage {...messages.cancel} />
			</CancelButton>
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

function ResetLink(props) {
	if (!props.visible) {
		return null;
	} else {
		return (
			<ResetButton onClick={props.onResetClick}>
				<FormattedMessage {...messages.resetLink} />
			</ResetButton>
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

				<ResetLink
					onResetClick={this.props.onResetClick}
					visible={this.props.onConfirmed}
				/>
			</div>
		);
	}
}

export default Submit;
