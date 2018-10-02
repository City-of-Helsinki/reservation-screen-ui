/**
 * Output formatted time.
 */

import React from 'react';
import PropTypes from 'prop-types';

class FormattedTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = this.props.date;

    if (date) {
      let hours = this.props.date.getHours();
      let mins = this.props.date.getMinutes();

      return (
        <span>
          {hours < 10 ? '0' : ''}
          {hours}:
          {mins < 10 ? '0' : ''}
          {mins}
        </span>
      );
    } else {
      return <span />;
    }
  }
}

export default FormattedTime;
