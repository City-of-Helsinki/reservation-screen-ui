import React from 'react';
import styled from 'styled-components';
import H1 from 'components/H1';
import H2 from 'components/H2';
import FormattedTime from 'components/FormattedTime';
import P from './P';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

class Status extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showNextAvailableTime =
      !this.props.isResourceAvailable && this.props.nextAvailableTime;
    const showAvailableUntil =
      this.props.isResourceAvailable && this.props.availableUntil;

    return (
      <Wrapper>
        <H1>{this.props.resourceName}</H1>
        {showAvailableUntil && (
          <P className="sau">
            <FormattedMessage {...messages.availableUntilClock} />
            <FormattedTime date={this.props.availableUntil} />
            <FormattedMessage {...messages.availableUntilUntil} />
          </P>
        )}

        {showNextAvailableTime && (
          <P className="snat">
            <FormattedMessage {...messages.nextAvailableTimeClock} />
            <FormattedTime date={this.props.nextAvailableTime} />
            <FormattedMessage {...messages.nextAvailableTimeUntil} />
          </P>
        )}
      </Wrapper>
    );
  }
}

export default Status;
