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

class SceneVerify extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <Timer className={'timer--hidden'} onTimesUp={this.props.onTimesUp} />
        <Icon verified />
        <H3>
          <FormattedMessage {...messages.title} />
        </H3>
        <HelperLink
          className={'helperlink--btn'}
          onHelperLinkClick={this.props.onButtonClick}
        >
          <FormattedMessage {...messages.ready} />
        </HelperLink>
      </Wrapper>
    );
  }
}

export default SceneVerify;
