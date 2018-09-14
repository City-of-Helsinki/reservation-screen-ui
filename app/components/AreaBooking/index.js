import React from 'react';
import Wrapper from './Wrapper';
import Button from 'components/Button';
import Title from './H3';

import { ThemeProvider } from 'styled-components';
import { withTheme } from 'styled-components';

import Submit from './Submit';

/* eslint-disable react/prefer-stateless-function */


class AreaBooking extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			header: 'Varaa tila'
		}
	}

	setInitialState(){

	}

	clickHandler(){

	}

  render() {
  	
    return (
    	<Wrapper className="l-booking__wrapper">
	      	<div className="c-booking">
		      	<Title>{this.state.header}</Title>
		        <Button href="#">
		        	Kello 13:00 saakka
		        </Button>

		        <Submit />
		        
		     </div>
      	</Wrapper>
    );
  }
}

export default AreaBooking;
