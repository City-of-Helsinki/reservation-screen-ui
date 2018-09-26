import React from 'react';
import styled from 'styled-components';
import NormalImg from 'components/Img';

export const Wrapper = styled.div`
	position: relative;
	display: block;
`;

export const IconWrapper = styled.div`
	display: block;
	text-align: center;
`;

export const Title = styled.h3`
	font-size: 48px;
	margin: 0 0 30px 0;
	font-weight: normal;
`;

export const Icon = styled(NormalImg)`
	display: block;
	width: 100px;
	height: auto;
	margin: 0 auto;
`;
