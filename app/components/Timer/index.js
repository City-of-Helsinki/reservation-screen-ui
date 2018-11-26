import React from 'react';
import { withTheme } from 'styled-components';
import Theme from 'components/Theme';
import { Wrapper, LeftHalf, RightHalf, Spinner } from './elements';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const self = this;
    self.interval = setInterval(function() {
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
