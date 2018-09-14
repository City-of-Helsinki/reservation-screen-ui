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
			items: [{id:1, text: '11:00'},
			{id:2, text: '13:00'}, {id:3, text:'16:00'}]
		}

		this.clickHandler = this.clickHandler.bind(this);
	}

	setInitialState(){

	}

	clickHandler(){

	}

	switchButtonState(state){

		this.setState({
			selected: state
		})

	}

  render() {
  	
    return (
    	<Wrapper>
	      	<div>
		      	<Title>{this.state.header}</Title>
		      	<ButtonList items={this.state.items} onButtonClick={this.switchButtonState.bind(this)} />
		        <Submit selected={this.state.selected} />
		        
		     </div>
      	</Wrapper>
    );
  }
}

export default AreaBooking;
