/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import { FormattedMessage } from 'react-intl';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import messages from './messages';

const Wrapper = styled.div`
  display: block;
`;

// eslint-disable-next-line react/prefer-stateless-function
class SceneCancel extends React.Component {
  render() {
    return (
      <Wrapper>
        <Icon />
        <H3>
          <FormattedMessage {...messages.title} />
        </H3>
        <HelperLink onHelperLinkClick={this.props.onButtonClick}>
          <FormattedMessage {...messages.cancel} />
        </HelperLink>
      </Wrapper>
    );
  }
}

export default SceneCancel;
