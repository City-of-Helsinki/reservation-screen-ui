import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import Submit from 'components/Submit';
import { FormattedMessage, defineMessages } from 'react-intl';
import P from 'components/P';
import messages from './messages';
import FormattedTime from 'components/FormattedTime';
import QRCode from 'qrcode.react';

const Wrapper = styled.div`
  display: block;
`;

const H2 = styled.h2`
  font-size: 48px;
  text-align: center;
`;

class SceneStrongAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

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
            value={'https://varaamo.hel.fi/resources/' + this.props.resourceId}
          />
        </P>
      </Wrapper>
    );
  }
}

export default SceneStrongAuth;
