import React from 'react';
import ButtonList from './ButtonList';
import Wrapper from './Wrapper';
import Title from './H3';
import { ThemeProvider } from 'styled-components';
import Submit from './Submit';

import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */

class AreaBooking extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: false,
			header: 'Varaa tila',
			activeIndex: 0,
			items: [
				{id:1, text: '11:00'},
				{id:2, text: '13:00'},
				{id:3, text:'16:00'}
			]
		}

		this.switchButtonState = this.switchButtonState.bind(this);
	}


	switchButtonState(evt){
		console.log('click', evt.target.id);

		this.setState({
			selected: true,
			activeIndex: evt.target.id
		})

	}

  render() {
  	
    return (
    	<Wrapper>
	      	<div>
		      	<Title>{this.state.header}</Title>
		      	<ButtonList items={this.state.items} onButtonClick={this.switchButtonState} />
		        <Submit disabled={this.state.selected} />
		        
		     </div>
      	</Wrapper>
    );
  }
}

export default AreaBooking;
