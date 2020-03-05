export const toggleDisplayClass = bool => {
  const toggleClass = !bool ? 'toggable is-shown' : 'toggable slide-out';
  return toggleClass;
};
