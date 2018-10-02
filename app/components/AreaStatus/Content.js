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

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showNextAvailableTime =
      !this.props.isResourceAvailable && this.props.nextAvailableTime;

    return (
      <Wrapper className="c-content">
        <H1>{this.props.resourceName}</H1>

        {this.props.isResourceAvailable && (
          <P>
            <FormattedMessage {...messages.resourceIsAvailable} />
          </P>
        )}

        {!this.props.isResourceAvailable && (
          <div>
            <P>
              <FormattedMessage {...messages.resourceIsNotAvailable} />
            </P>
          </div>
        )}
        {showNextAvailableTime && (
          <H2>
            <FormattedMessage {...messages.clock} />
            <FormattedTime date={this.props.nextAvailableTime} />
            <FormattedMessage {...messages.until} />
          </H2>
        )}
      </Wrapper>
    );
  }
}

export default Content;
