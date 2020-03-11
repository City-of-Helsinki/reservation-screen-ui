/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  resourceIsAvailable: {
    id: 'AreaStatus.area.resourceIsAvailable',
    defaultMessage: 'Tila on vapaa',
  },
  resourceIsNotAvailable: {
    id: 'AreaStatus.area.resourceIsNotAvailable',
    defaultMessage: 'Tila on varattu',
  },
  availableUntilClock: {
    id: 'boilerplate.components.AreaStatus.area.clock',
    defaultMessage: 'klo',
  },
  availableUntilUntil: {
    id: 'boilerplate.components.AreaStatus.area.until.until',
    defaultMessage: 'asti',
  },
  persons: {
    id: 'AreaStatus.area.persons',
    defaultMessage: 'henkilöä',
  },
  max: {
    id: 'AreaStatus.area.max',
    defaultMessage: 'max',
  },
  bookAt: {
    id: 'AreaStatus.area.bookAt',
    defaultMessage: 'Varaa osoitteessa: <b>{linkLabel}</b>',
  },
});
