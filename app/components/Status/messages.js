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
  areaOccupiedUntil: {
    id: 'AreaStatus.area.until',
    defaultMessage: 'Klo {time} saakka',
  },
});
