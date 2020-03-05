/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/**
 * Output formatted time.
 */

import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class FormattedTime extends React.Component {
  render() {
    const date = this.props.date;

    if (date) {
      const hours = this.props.date.getHours();
      const mins = this.props.date.getMinutes();

      return (
        <span>
          {hours < 10 ? '0' : ''}
          {hours}:
          {mins < 10 ? '0' : ''}
          {mins}
        </span>
      );
    }
    return <span />;
  }
}

export default FormattedTime;
