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
    id: 'boilerplate.components.AreaStatus.area.resourceIsNotFre',
    defaultMessage: 'Tila on varattu',
  },
  areaOccupiedUntil: {
    id: 'boilerplate.components.AreaStatus.area.until',
    defaultMessage: 'Klo {time} saakka',
  },
});
