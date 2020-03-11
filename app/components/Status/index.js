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

const ReservationRules = styled.div``;

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

  return (
    <Wrapper>
      <H1>{resourceName}</H1>
      {showAvailableUntil && (
        <P className="sau">
          <FormattedMessage {...messages.resourceIsAvailable} />{' '}
          <FormattedMessage {...messages.availableUntilClock} />{' '}
          <FormattedTime date={availableUntil} />{' '}
          <FormattedMessage {...messages.availableUntilUntil} />
        </P>
      )}
      {showNextAvailableTime && (
        <P className="snat">
          <FormattedMessage {...messages.resourceIsNotAvailable} />{' '}
          <FormattedMessage {...messages.availableUntilClock} />{' '}
          <FormattedTime date={nextAvailableTime} />{' '}
          <FormattedMessage {...messages.availableUntilUntil} />
        </P>
      )}
      <ReservationRules>
        {resourcePeopleCount} <FormattedMessage {...messages.persons} />{' '}
        <span>&middot;</span> <FormattedMessage {...messages.max} />{' '}
        {resourceMaxReservationTimeHours}h
      </ReservationRules>
    </Wrapper>
  );
};

Status.propTypes = {
  isResourceAvailable: PropTypes.bool,
  nextAvailableTime: PropTypes.bool,
  availableUntil: PropTypes.bool,
  resourceName: PropTypes.string,
  resourcePeopleCount: PropTypes.string,
  resourceMaxReservationTime: PropTypes.string,
};

export default Status;
