import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import CalendarLegendOverrides from './CalendarLegendOverrides';

const Col = styled.div`
  width: ${props => (props.md ? `${props.md / 12}%` : '100%')};
`;

Col.propTypes = {
  children: PropTypes.node.isRequired,
};

const CalendarLegend = () => (
  <CalendarLegendOverrides>
    <Col md={3}>
      <div className="color-box color-box__closed" />
      <p>
        <FormattedMessage id="CalendarLegend.closed" />
      </p>
    </Col>

    <Col md={3}>
      <div className="color-box color-box__selection" />
      <p>
        <FormattedMessage id="CalendarLegend.selection" />
      </p>
    </Col>

    <Col md={3}>
      <div className="color-box color-box__taken" />
      <p>
        <FormattedMessage id="CalendarLegend.taken" />
      </p>
    </Col>

    <Col md={3}>
      <div className="color-box color-box__available">
        <span className="dash" />
      </div>
      <p>
        <FormattedMessage id="CalendarLegend.available" />
      </p>
    </Col>
  </CalendarLegendOverrides>
);

CalendarLegend.propTypes = {};

export default CalendarLegend;
