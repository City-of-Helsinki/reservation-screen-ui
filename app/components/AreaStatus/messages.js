/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  areaTitle: {
    id: 'boilerplate.components.AreaStatus.area.header',
    defaultMessage: 'Tilan nimi',
  },
  areaStatus: {
    id: 'boilerplate.components.AreaStatus.area.status',
    defaultMessage: 'on vapaa',
  },
  areaOccupiedUntil: {
    id: 'boilerplate.components.AreaStatus.area.until',
    defaultMessage: 'Klo {time} saakka',
  },
});
