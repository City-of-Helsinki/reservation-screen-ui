import React from 'react';
import styled from 'styled-components';
import H1 from 'components/H1';
import H2 from 'components/H2';
import P from './P';


const Wrapper = styled.div`
	margin-bottom: 30px;
`;

class Content extends React.Component {
	constructor(props){
		super();
		this.state = {
			room: 'Studiotila 1',
			status: 'Tila on vapaa',
			until: 'klo 13:00 saakka'
		}
	}

	render() {
		return (
		  <Wrapper className="c-content">
		    <H1>{this.state.room}</H1>
		    <P>{this.state.status}</P>
		    <H2>{this.state.until}</H2>
		  </Wrapper>
		);
	}
}

export default Content;

