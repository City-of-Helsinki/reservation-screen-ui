import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from './buttons';

const Wrapper = styled.div`
	display: block;
`;
const Link = styled.div`
	display: block;
	background-color: #aea;
`;

function Submit(props) {
	let link = (
		<StyledButton onClick={props.onClick} disabled={props.disabled}>
			{Children.toArray(props.children)}
		</StyledButton>
	);

	return <Wrapper>{link}</Wrapper>;
}

Submit.propTypes = {
	children: PropTypes.any,
};

export default Submit;
