import React from 'react';
import HelperLink from 'components/HelperLink';
import { FormattedMessage, defineMessages } from 'react-intl';
import Icon from 'components/Icon';
import Timer from 'components/Timer';

import { Wrapper, H3 } from './Wrapper';

const messages = defineMessages({
  ready: {
    id: 'boilerplate.components.SceneVerify.link.cancel',
    defaultMessage: 'Valmis',
  },
  title: {
    id: 'boilerplate.components.SceneVerify.title',
    defaultMessage: 'Varaus onnistui!',
  },
});

function SceneVerify(props) {
  return (
    <Wrapper>
      <Timer className={'timer--hidden'} onTimesUp={props.onTimesUp} />
      <Icon verified />
      <H3>
        <FormattedMessage {...messages.title} />
      </H3>
      <HelperLink
        className={'helperlink--btn'}
        onHelperLinkClick={props.onButtonClick}
      >
        <FormattedMessage {...messages.ready} />
      </HelperLink>
    </Wrapper>
  );
}

export default SceneVerify;
