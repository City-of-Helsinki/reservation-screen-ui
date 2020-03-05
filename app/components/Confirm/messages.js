/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  bookingStartsAt: {
    id: 'boilerplate.components.Confirm.starts',
    defaultMessage: 'Varauksesi alkaa {br} kello {time}',
  },
  bookingEndsAt: {
    id: 'boilerplate.components.Confirm.ends',
    defaultMessage: 'Varauksesi loppuu {br} kello {time}',
  },
});
