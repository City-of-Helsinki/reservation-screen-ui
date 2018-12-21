import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import { FormattedMessage, defineMessages } from 'react-intl';
import H3 from 'components/H3';
import Icon from 'components/Icon';
import Timer from 'components/Timer';
import Submit from 'components/Submit';

const messages = defineMessages({
  cancel: {
    id: 'boilerplate.components.SceneCancel.link.cancel',
    defaultMessage: 'Takaisin alkuun',
  },
  title: {
    id: 'boilerplate.components.SceneCancel.title',
    defaultMessage: 'Varaus peruttu',
  },
});

const Wrapper = styled.div`
  display: block;
`;

function SceneCancel(props) {
  return (
    <Wrapper>
      <Timer className={'timer--hidden'} onTimesUp={props.onTimesUp} />
      <Icon />
      <H3>
        <FormattedMessage {...messages.title} />
      </H3>
      <Submit onClick={props.onButtonClick}>
        <FormattedMessage {...messages.cancel} />
      </Submit>
    </Wrapper>
  );
}

export default SceneCancel;
