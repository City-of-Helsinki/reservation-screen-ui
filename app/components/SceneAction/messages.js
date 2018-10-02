/*
 * Submit Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
	cancel: {
		id: 'link.cancel.booking',
		defaultMessage: 'Peruuta varaus',
	},
	book: {
		id: 'link.book',
		defaultMessage: 'Varaa',
	},
	title: {
		id: 'title.confirm.booking',
		defaultMessage: 'Vahvista varaus!',
	},
	startsAt: {
		id: 'text.starts.at',
		defaultMessage: 'Varauksesi alkaa {br} kello startTime',
	},
	endsAt: {
		id: 'text.ends.at',
		defaultMessage: 'Varauksesi loppuu {br} kello endTime',
	},
});
