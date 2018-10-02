/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  resourceIsFree: {
    id: 'boilerplate.components.AreaStatus.area.resourceIsFree',
    defaultMessage: 'Tila on vapaa',
  },
  resourceIsNotFree: {
    id: 'boilerplate.components.AreaStatus.area.resourceIsNotFree',
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
