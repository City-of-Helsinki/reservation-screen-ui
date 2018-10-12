export const toggleDisplayClass = bool => {
	let toggleClass = !bool ? 'toggable is-shown' : 'toggable slide-out';
	return toggleClass;
};
