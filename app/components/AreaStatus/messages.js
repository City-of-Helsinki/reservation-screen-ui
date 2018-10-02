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
  clock: {
    id: 'boilerplate.components.AreaStatus.area.clock',
    defaultMessage: 'klo ',
  },
  until: {
    id: 'boilerplate.components.AreaStatus.area.until',
    defaultMessage: ' saakka',
  },
});
