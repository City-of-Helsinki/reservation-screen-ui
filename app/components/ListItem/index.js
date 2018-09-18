import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Item from './Item';
import Wrapper from './Wrapper';

function ListItem(props) {
	return (
		<Wrapper>
			<Item>
				{moment(props.item.begin).format('HH.mm')} -{' '}
				{moment(props.item.end).format('HH.mm')}
			</Item>
		</Wrapper>
	);
}

ListItem.propTypes = {
	item: PropTypes.any,
};

export default ListItem;
