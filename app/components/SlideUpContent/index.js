import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import messages from './messages';
import Wrapper from './Wrapper';

const ShowMoreButton = styled.button`
  padding: 0;
  margin: 20px auto 40px;

  font-family: inherit;
  white-space: nowrap;
  font-size: 16px;
  text-decoration: underline;

  background: transparent;
`;

const Div = styled.div`
  font-size: 16px;
  line-height: 24px;

  p:empty {
    display: none;
  }
`;

const SlideUpContent = ({ visible, content, onButtonClick }) => {
  const cssClass = visible ? 'slide-up' : 'slide-down';

  return (
    <Wrapper className={cssClass}>
      <Div className={cssClass} dangerouslySetInnerHTML={{ __html: content }} />
      <ShowMoreButton onClick={onButtonClick}>
        {!visible ? (
          <span>
            <FormattedMessage {...messages.showMore} />
          </span>
        ) : (
          <span>
            <FormattedMessage {...messages.hideMore} />
          </span>
        )}
      </ShowMoreButton>
    </Wrapper>
  );
};

SlideUpContent.propTypes = {
  visible: PropTypes.bool,
  content: PropTypes.any,
  onButtonClick: PropTypes.func.isRequired,
};

export default SlideUpContent;
