/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  resourceIsAvailableUntil: {
    id: 'Status.resourceIsAvailableUntil',
    defaultMessage: 'Tila on vapaa klo {time} asti',
  },
  resourceIsNotAvailableUntil: {
    id: 'Status.resourceIsNotAvailableUntil',
    defaultMessage: 'Vapautuu klo {time}',
  },
  persons: {
    id: 'Status.persons',
    defaultMessage: 'henkilöä',
  },
  max: {
    id: 'Status.max',
    defaultMessage: 'max',
  },
});
