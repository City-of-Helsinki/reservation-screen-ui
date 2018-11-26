/*
 * Submit Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  cancel: {
    id: 'link.cancel',
    defaultMessage: 'Peruuta tilaus',
  },
  book: {
    id: 'link.book',
    defaultMessage: 'Varaa',
  },
  title: {
    id: 'title.book',
    defaultMessage: 'Varaa tila',
  },
  notAvailable: {
    id: 'booking.notAvailable',
    defaultMessage: 'Tilaa ei voi {br} varata juuri nyt.',
  },
});
