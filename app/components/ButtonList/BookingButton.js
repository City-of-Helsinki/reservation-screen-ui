import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';

const BookingButton = styled(BasicButton)`
	margin: 0 auto 1rem;
	display: block;
	&:last-of-type {
		margin-bottom: 3rem;
	}
`;

export default BookingButton;
