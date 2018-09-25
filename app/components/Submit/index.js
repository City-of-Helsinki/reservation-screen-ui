import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { StyledButton, CancelLink, ResetLink } from './buttons';

function SubmitButton(props) {
	if (props.visible) {
		return (
			<StyledButton
				onClick={props.onSubmitClick}
				disabled={props.disabled}
			>
				<FormattedMessage {...messages.submitButton} />
			</StyledButton>
		);
	} else {
		return false;
	}
}

function HelperLink(props) {
	switch (props.view) {
		case 'CTA':
			return (
				<CancelLink onClick={props.onCancelClick}>
					<FormattedMessage {...messages.cancel} />
				</CancelLink>
			);
		case 'CANCELLED':
			return (
				<ResetLink onClick={props.onResetClick}>
					<FormattedMessage {...messages.resetLink} />
				</ResetLink>
			);
		case 'VERIFIED':
			return (
				<ResetLink onClick={props.onResetClick}>
					<FormattedMessage {...messages.finishedLink} />
				</ResetLink>
			);
		default:
			return null;
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
					visible={this.props.buttonVisible}
					confirmed={this.props.isVerified}
					disabled={this.props.disabled}
					className={this.props.active}
					onSubmitClick={this.props.onSubmitClick}
				>
					<FormattedMessage {...messages.submitButton} />
				</SubmitButton>

				<HelperLink
					view={this.props.view}
					onCancelClick={this.props.onCancelClick}
					onResetClick={this.props.onResetClick}
					onVerifyClick={this.props.onVerifyClick}
				/>
			</div>
		);
	}
}

export default Submit;
