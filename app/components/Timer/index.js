/* eslint-disable react/prop-types */
import React from 'react';
import { Wrapper, LeftHalf, RightHalf, Spinner } from './elements';

class Timer extends React.Component {
  componentDidMount() {
    const self = this;
    self.interval = setInterval(() => {
      clearInterval(self.interval);
      self.onTimesUp();
    }, 6000);
  }

  componentWillUnmount() {
    const self = this;
    clearInterval(self.interval);
  }

  onTimesUp = () => {
    this.props.onTimesUp();
  };

  render() {
    return (
      <Wrapper className={this.props.className}>
        <LeftHalf />
        <Spinner />
        <RightHalf />
      </Wrapper>
    );
  }
}

export default Timer;
