import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from './Wrapper';

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  line-height: 46px;
  font-size: 28px;
`;

const ItemTime = styled.div`
  width: 40%;
`;

const ItemTitle = styled.div`
  width: 60%;
  overflow: hidden;
  height: 46px;
`;

function ListItem(props) {
  return (
    <Wrapper>
      <Item>
        <ItemTime>
          {moment(props.item.get('begin')).format('HH.mm')} -{' '}
          {moment(props.item.get('end')).format('HH.mm')}
        </ItemTime>
        <ItemTitle>
          {props.item.get('event_subject') || (
            <FormattedMessage {...messages.defaultTitle} />
          )}
        </ItemTitle>
      </Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
