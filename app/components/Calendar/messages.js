import { defineMessages } from 'react-intl';

export default defineMessages({
  minPeriodText: {
    id: 'Calendar.info.minPeriodText',
    defaultMessage: 'Varauksen on kestettävä vähintään {duration} tuntia.',
  },
  maxPeriodText: {
    id: 'Calendar.info.maxPeriodText',
    defaultMessage: 'Varaus saa kestää enimmillään {duration} tuntia.',
  },
  today: {
    id: 'Calendar.info.today',
    defaultMessage: 'Tänään',
  },
  selectedDateLabel: {
    id: 'Calendar.selectedDateLabel',
    defaultMessage: 'Valittu aika:',
  },
  selectedDateValue: {
    id: 'Calendar.selectedDateValue',
    defaultMessage: '{date} klo {start} - klo {end} ({duration})',
  },
});
