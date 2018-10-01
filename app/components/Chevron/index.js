import React from 'react';
import styled from 'styled-components';
import NormalImg from 'components/Img';
import ChevronPng from './icon-chevron-left.png';

const Wrapper = styled.i`
	display: inline-block;
	font: normal normal normal 14px/1 FontAwesome;
	font-size: inherit;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	transform: translate(0, 2px);
	&:before {
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background-image: url(${ChevronPng});
		background-repeat: no-repeat;
		background-size: contain;
	}
`;

function Chevron(props) {
	return <Wrapper />;
}

export default Chevron;
