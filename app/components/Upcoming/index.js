/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import List from 'components/List';
import ListItem from 'components/ListItem';
import { FormattedMessage } from 'react-intl';
import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import messages from './messages';

const H4 = styled.h4`
  font-size: 18px;
  font-weight: normal;
  margin: 0 0 10px;
`;

const Div = styled.div`
  display: block;
`;

const maxNum = 3;

// eslint-disable-next-line react/prefer-stateless-function
class Upcoming extends React.Component {
  render() {
    return (
      <Div>
        {this.props.upcomingReservations.size > 0 && (
          <Div className={toggleDisplayClass(this.props.className)}>
            <H4>
              <FormattedMessage {...messages.title} />
            </H4>
            <List
              limit={maxNum}
              items={this.props.upcomingReservations}
              component={ListItem}
            />
          </Div>
        )}
      </Div>
    );
  }
}

export default Upcoming;
