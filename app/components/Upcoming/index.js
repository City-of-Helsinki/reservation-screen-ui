import React from 'react';
import styled from 'styled-components';
import H3 from 'components/H3';
import List from 'components/List';
import ListItem from 'components/ListItem';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { toggleDisplayClass } from 'utils/toggleDisplayClass';

const H4 = styled.h4`
  font-size: 18px;
  font-weight: normal;
  margin: 0 0 10px;
`;

const Div = styled.div`
  display: block;
`;

const maxNum = 3;

class Upcoming extends React.Component {
  constructor(props) {
    super(props);
  }

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
