import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: block;
`;
const Link = styled.div`
	display: block;
`;

function HelperLink(props) {
	let link = (
		<Link onClick={props.onHelperLinkClick}>
			{Children.toArray(props.children)}
		</Link>
	);

	return <Wrapper>{link}</Wrapper>;
}

HelperLink.propTypes = {
	children: PropTypes.any,
};

export default HelperLink;
