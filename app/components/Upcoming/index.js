import React from 'react';
import styled from 'styled-components';
import H3 from 'components/H3';
import List from 'components/List';
import ListItem from 'components/ListItem';

const H4 = styled.h4`
	font-size: 28px;
	font-weight: normal;
	margin: 0;
`;

class Upcoming extends React.Component {
	constructor(props){
		super(props);
		const maxNum = 3;

		this.state = {
			text: 'Tulevat varaukset',
			items: [
				{id: '13:00 - 15:00 Talonyhtiön kokous'},
				{id: '16:00 - 18:00 Vapaa'}
			]
		};
	}

	render() {
		return(
			<div className="c-upcoming">
				<H4>{this.state.text}</H4>
				<List items={this.state.items} component={ListItem} />
			</div>
		);
	}
}

export default Upcoming;