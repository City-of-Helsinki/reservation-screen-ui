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
const ExtraInformation = styled.span``;

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
  resourceId,
  resourceName,
  resourcePeopleCount,
  resourceMaxReservationTime,
}) => {
  const showNextAvailableTime = !isResourceAvailable && nextAvailableTime;
  const showAvailableUntil = isResourceAvailable && availableUntil;
  const resourceMaxReservationTimeHours = getHours(resourceMaxReservationTime);
  const hasReservationRules = resourcePeopleCount || resourceMaxReservationTime;
  const productionRespaResourcePageUrlLabel = `varaamo.hel.fi/${resourceId}`;

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
      {hasReservationRules && (
        <ReservationRules>
          {resourcePeopleCount} <FormattedMessage {...messages.persons} />{' '}
          <span>&middot;</span> <FormattedMessage {...messages.max} />{' '}
          {resourceMaxReservationTimeHours}h
        </ReservationRules>
      )}
      {!isResourceAvailable && (
        <ExtraInformation>
          <FormattedMessage
            {...messages.bookAt}
            values={{
              linkLabel: productionRespaResourcePageUrlLabel,
              b: (...chunks) => <b>{chunks}</b>,
            }}
          />
        </ExtraInformation>
      )}
    </Wrapper>
  );
};

Status.propTypes = {
  isResourceAvailable: PropTypes.bool,
  nextAvailableTime: PropTypes.bool,
  availableUntil: PropTypes.bool,
  resourceId: PropTypes.string,
  resourceName: PropTypes.string,
  resourcePeopleCount: PropTypes.number,
  resourceMaxReservationTime: PropTypes.string,
};

export default Status;
