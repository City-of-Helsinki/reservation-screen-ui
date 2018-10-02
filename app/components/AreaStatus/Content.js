import React from 'react';
import styled from 'styled-components';
import H1 from 'components/H1';
import H2 from 'components/H2';
import P from './P';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: 'Studiotila 1',
      status: 'Tila on vapaa',
      until: '13:00',
    };
  }

  render() {
    const { until, room } = this.state;
    return (
      <Wrapper className="c-content">
        <H1>{this.props.resourceName}</H1>

        {this.props.isResourceAvailable && (
          <P>
            <FormattedMessage {...messages.resourceIsAvailable} />
          </P>
        )}
        {!this.props.isResourceAvailable && (
          <P>
            <FormattedMessage {...messages.resourceIsNotAvailable} />
          </P>
        )}

        <H2>
          <FormattedMessage
            {...messages.areaOccupiedUntil}
            values={{ time: until }}
          />
        </H2>
      </Wrapper>
    );
  }
}

export default Content;
