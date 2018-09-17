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
			disabled: true,
			header: 'Varaa tila',
			activeIndex: '',
			activeClass: 'btn-active',
			items: [
				{id:'button-1', text: '11:00', active: false},
				{id:'button-2', text: '13:00', active: false},
				{id:'button-3', text:'16:00', active: false}
			]
		}

		this.switchButtonState = this.switchButtonState.bind(this);
	}

	switchButtonState(evt, btnIndex){

		let btns = this.state.items;
		btns[btnIndex].active = true;

		if(evt.target.id == this.state.activeIndex){
			this.setState({
				disabled: true,
				activeIndex: ''
			})
			return;
		}

		this.setState({
			disabled: false,
			activeIndex: evt.target.id
		})
	}

  	render() {  	
    	return (
	    	<Wrapper>
		      	<div>
			      	<Title>{this.state.header}</Title>
			      	<ButtonList items={this.state.items} onButtonClick={this.switchButtonState} />
			        <Submit disabled={this.state.disabled} />		        
			     </div>
	      	</Wrapper>
	    );
  	}
}

export default AreaBooking;
