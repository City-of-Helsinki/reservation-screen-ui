import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import H1 from 'components/H1';
import FormattedTime from 'components/FormattedTime';
import P from './P';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 30px;
`;

const ReservationRules = styled.div`
  font-size: ${props => props.theme.fontSize[4]};
`;

function getHours(stringHours) {
  if (!stringHours) {
    return 0;
  }

  const [hours, minutes] = stringHours.split(':');

  const wholeHours = Number(hours);
  const minutesAsHours = Number(minutes) / 60;

  return wholeHours + minutesAsHours;
}

const Status = ({
  isResourceAvailable,
  nextAvailableTime,
  availableUntil,
  resourceName,
  resourcePeopleCount,
  resourceMaxReservationTime,
}) => {
  const showNextAvailableTime = !isResourceAvailable && nextAvailableTime;
  const showAvailableUntil = isResourceAvailable && availableUntil;
  const resourceMaxReservationTimeHours = getHours(resourceMaxReservationTime);
  const hasReservationRules = resourcePeopleCount || resourceMaxReservationTime;

  return (
    <Wrapper>
      <H1>{resourceName}</H1>
      {showAvailableUntil && (
        <P className="sau">
          <FormattedMessage
            {...messages.resourceIsAvailableUntil}
            values={{ time: <FormattedTime date={availableUntil} /> }}
          />
        </P>
      )}
      {showNextAvailableTime && (
        <P className="snat">
          <FormattedMessage
            {...messages.resourceIsNotAvailableUntil}
            values={{ time: <FormattedTime date={nextAvailableTime} /> }}
          />
        </P>
      )}
      {hasReservationRules && (
        <ReservationRules>
          {resourcePeopleCount} <FormattedMessage {...messages.persons} />{' '}
          <span>&middot;</span> <FormattedMessage {...messages.max} />{' '}
          {resourceMaxReservationTimeHours}h
        </ReservationRules>
      )}
    </Wrapper>
  );
};

Status.propTypes = {
  isResourceAvailable: PropTypes.bool,
  nextAvailableTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  availableUntil: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.bool,
  ]).isRequired,
  resourceName: PropTypes.string,
  resourcePeopleCount: PropTypes.number,
  resourceMaxReservationTime: PropTypes.string,
};

export default Status;
