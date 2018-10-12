import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	text-align: center;

	div {
		text-align: left;
		overflow-y: scroll;
		max-height: 0;
		transition: max-height 0.5s ease-in-out;
		&.slide-up {
			max-height: 50vh;
		}
		&.slide-down {
			max-height: 0;
		}
	}
`;

export default Wrapper;
