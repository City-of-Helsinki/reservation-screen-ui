/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
	submitButton: {
		id: 'boilerplate.components.AreaBooking.button.submit',
		defaultMessage: 'Varaa',
	},
	bookingTitle: {
		id: 'boilerplate.components.AreaBooking.booking.title',
		defaultMessage: 'Varaa tila',
	},
	confirmTitle: {
		id: 'boilerplate.components.AreaBooking.confirm.title',
		defaultMessage: 'Vahvista varaus',
	},
	cancel: {
		id: 'boilerplate.components.Confirm.cancel',
		defaultMessage: 'Peruuta varaus',
	},
	cancelledTitle: {
		id: 'boilerplate.components.Confirm.cancelledTitle',
		defaultMessage: 'Varaus peruttu',
	},
	resetLink: {
		id: 'boilerplate.components.Confirm.resetLink',
		defaultMessage: 'Palaa alkuun',
	},
});
