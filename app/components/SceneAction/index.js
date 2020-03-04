/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import Submit from 'components/Submit';
import { FormattedMessage } from 'react-intl';
import P from 'components/P';
import Timer from 'components/Timer';
import FormattedTime from 'components/FormattedTime';
import messages from './messages';

const Wrapper = styled.div`
  display: block;
`;

const LinkWrapper = styled.div`
  color: #f00;
  i {
    display: none;
  }
`;

const H2 = styled.h2`
  font-size: 48px;
  text-align: center;
`;

// eslint-disable-next-line react/prefer-stateless-function
class SceneAction extends React.Component {
  render() {
    return (
      <Wrapper>
        <Timer onTimesUp={this.props.onTimesUp} />
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
        <P>
          <FormattedMessage {...messages.startsAt} values={{ br: <br /> }} />
          <FormattedTime date={this.props.selectedSlot.begin} />
        </P>

        <P>
          <FormattedMessage {...messages.endsAt} values={{ br: <br /> }} />
          <FormattedTime date={this.props.selectedSlot.end} />
        </P>

        <Submit onClick={this.props.onButtonClick}>
          <FormattedMessage {...messages.book} />
        </Submit>

        <LinkWrapper>
          <HelperLink onHelperLinkClick={this.props.onCancelClick}>
            <FormattedMessage {...messages.cancel} />
          </HelperLink>
        </LinkWrapper>
      </Wrapper>
    );
  }
}

export default SceneAction;
