import React from 'react';
import styled from 'styled-components';
import BasicButton from 'components/BasicButton';

const SubmitButton = styled(BasicButton)`
	background-color: pink;
`;

const Submit = ({name}) => {

	const SubmitHandle = (event) => {
		console.log('Booked!');
	}

	return (
		<div>
			<SubmitButton onClick={SubmitHandle}>Submit</SubmitButton>
		</div>

		// 
	);
}


export default Submit;