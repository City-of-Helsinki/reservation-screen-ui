import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Wrapper from './Wrapper';
import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';
import P from 'components/P';
import Chevron from 'components/Chevron';

const ShowMoreButton = styled(ButtonBase)`
  background: transparent;
  white-space: nowrap;
  font-size: 18px;
  margin: 20px auto;
`;

const Div = styled.div`
  font-size: 18px;
  line-height: 24px;

  p:empty {
    display: none;
  }
`;

class SlideUpContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cssClass = this.props.visible ? 'slide-up' : 'slide-down';

    return (
      <Wrapper className={cssClass}>
        <ShowMoreButton onClick={this.props.onButtonClick}>
          {!this.props.visible ? (
            <span>
              <FormattedMessage {...messages.showMore} />
              <Chevron className="up" />
            </span>
          ) : (
            <span>
              <FormattedMessage {...messages.hideMore} />
              <Chevron className="down" />
            </span>
          )}
        </ShowMoreButton>

        <Div
          className={cssClass}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </Wrapper>
    );
  }
}

export default SlideUpContent;
