/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import QRCode from 'qrcode.react';
import P from 'components/P';
import messages from './messages';

const Wrapper = styled.div`
  display: block;
`;

const H2 = styled.h2`
  font-size: 48px;
  text-align: center;
`;

// eslint-disable-next-line react/prefer-stateless-function
class SceneStrongAuth extends React.Component {
  render() {
    return (
      <Wrapper>
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
        <P>
          <FormattedMessage {...messages.info} />
          <br />
          https://varaamo.hel.fi/resources/
          {this.props.resourceId}
        </P>
        <P>
          <FormattedMessage {...messages.qrinfo} />
        </P>
        <P>
          <QRCode
            value={`https://varaamo.hel.fi/resources/${this.props.resourceId}`}
          />
        </P>
      </Wrapper>
    );
  }
}

export default SceneStrongAuth;
