import { defineMessages } from 'react-intl';

export default defineMessages({
  minPeriodText: {
    id: 'Calendar.info.minPeriodText',
    defaultMessage: 'Reservation must be at least {duration}h long',
  },
  maxPeriodText: {
    id: 'Calendar.info.maxPeriodText',
    defaultMessage: 'Reservation must be shorter than {duration}h',
  },
  today: {
    id: 'Calendar.info.today',
    defaultMessage: 'Today',
  },
  selectedDateLabel: {
    id: 'Calendar.selectedDateLabel',
    defaultMessage: 'Valittu aika:',
  },
  selectedDateValue: {
    id: 'Calendar.selectedDateValue',
    defaultMessage: '{date} klo {start} - klo {end} ({duration})',
  },
  selectedDateValueWithPrice: {
    id: 'Calendar.selectedDateValueWithPrice',
    defaultMessage: '{date} klo {start} - klo {end} ({duration}) yht {price}€',
  },
});
