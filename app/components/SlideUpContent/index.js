import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';

const ShowMoreButton = styled(ButtonBase)`
	background: transparent;
	position: absolute;
	bottom: 5%;
	left: 50%;
	transform: translateX(-50%);
	white-space: nowrap;
	font-size: 18px;
`;

const SlideUpContent = props => {
	return (
		<div>
			<ShowMoreButton>
				<FormattedMessage {...messages.showMore} />
			</ShowMoreButton>

			<p>{props.content}</p>
		</div>
	);
};

export default SlideUpContent;
