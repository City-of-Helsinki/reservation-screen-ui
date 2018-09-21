import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';

export const StyledButton = styled(BasicButton)`
	background-color: #63e080;
	border: 0;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
	padding-left: 4rem;
	padding-right: 4rem;
	line-height: 4.4rem;
	border-radius: 2.2rem;
	font-size: 24px;
	transition: 0.1s opacity linear 0.1s;

	margin-bottom: 30px;

	&[disabled] {
		opacity: 0.2;
		pointer-events: none;
	}
`;

export const CancelButton = styled.div`
	display: block;
	color: red;
	text-decoration: none;
`;

export const ResetButton = styled.div`
	display: block;
	color: silver;
	text-decoration: none;
`;


