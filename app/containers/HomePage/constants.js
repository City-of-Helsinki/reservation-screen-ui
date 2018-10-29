/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const LOAD_RESERVATIONS = 'oodi/Home/LOAD_USERNAME';
export const LOAD_RESERVATIONS_SUCCESS = 'oodi/Home/LOAD_RESERVATIONS_SUCCESS';
export const LOAD_RESERVATIONS_ERROR = 'oodi/Home/LOAD_RESERVATIONS_ERROR';
export const UPDATE_CLOCK = 'oodi/Home/UPDATE_CLOCK';
export const CHANGE_SCENE = 'oodi/Home/CHANGE_SCENE';
export const CHANGE_SLOT = 'oodi/Home/CHANGE_SLOT';
export const MAKE_RESERVATION = 'oodi/Home/MAKE_RESERVATION';
export const MAKE_RESERVATION_COMPLETED =
  'oodi/Home/MAKE_RESERVATION_COMPLETED';
export const MAKE_RESERVATION_ERROR = 'oodi/Home/MAKE_RESERVATION_ERROR';
