import React from 'react';
import styled from 'styled-components';
import H3 from 'components/H3';
import List from 'components/List';
import ListItem from 'components/ListItem';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const H4 = styled.h4`
  font-size: 28px;
  font-weight: normal;
  margin: 0;
`;

const maxNum = 3;

class Upcoming extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="c-upcoming">
        <H4>
          <FormattedMessage {...messages.title} />
        </H4>
        <List
          limit={maxNum}
          items={this.props.upcomingReservations}
          component={ListItem}
        />
      </div>
    );
  }
}

export default Upcoming;
