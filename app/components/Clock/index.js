/**
 *
 * Clock.js
 *
 * A clock. 
 */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import clockStyles from './clockStyles';
import P from './P';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      hours: new Date().getHours(),
      mins: this.checkMinutes(),
    }
  }

  checkMinutes() {
    let m = new Date().getMinutes()

    if(m < 10){
      m = '0' + m;
    }else{
      m = m;
    }
    
    return m;
  }

  componentDidMount() {
    const self = this;
    self.interval = setInterval(function() {
      self.setState({
        hours: new Date().getHours(),
        mins: self.checkMinutes(),
      });
    }, 1000);

    if(this.state.hours < 10) {
      this.state.hours = '0' + this.state.hours;
    }

    if(this.state.mins < 10) {
      this.state.mins = '0' + this.state.mins;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Wrapper className="c-clock">
        <span>{this.state.hours}:{this.state.mins}</span>  
      </Wrapper>
    );
  }
}

export default Clock;
