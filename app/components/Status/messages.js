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
  nextAvailableTimeClock: {
    id: 'boilerplate.components.AreaStatus.area.reserved',
    defaultMessage: 'Varattu klo ',
  },
  nextAvailableTimeUntil: {
    id: 'boilerplate.components.AreaStatus.area.until',
    defaultMessage: ' saakka',
  },
  availableUntilClock: {
    id: 'boilerplate.components.AreaStatus.area.clock',
    defaultMessage: 'klo ',
  },
  availableUntilUntil: {
    id: 'boilerplate.components.AreaStatus.area.until',
    defaultMessage: ' asti',
  },
});
