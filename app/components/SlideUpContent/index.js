/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ButtonBase from 'components/BasicButton';
import styled from 'styled-components';
import Chevron from 'components/Chevron';
import messages from './messages';
import Wrapper from './Wrapper';

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

// eslint-disable-next-line react/prefer-stateless-function
class SlideUpContent extends React.Component {
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
