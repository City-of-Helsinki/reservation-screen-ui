/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  SETUP_REQUIRED,
  LOAD_RESERVATIONS_SUCCESS,
  UPDATE_CLOCK,
  CHANGE_SCENE,
  CHANGE_SLOT,
  MAKE_RESERVATION_COMPLETED,
  MAKE_RESERVATION_ERROR,
  TOGGLE_DESCRIPTION_OPEN,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  date: new Date(),
  resource: null,
  scene: 'Start',
  selectedSlot: false,
  idDescriptionOpen: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_REQUIRED:
      return state.set('scene', 'Setup');
    case TOGGLE_DESCRIPTION_OPEN:
      return state.set('isDescriptionOpen', !state.get('isDescriptionOpen'));
    case UPDATE_CLOCK:
      return state.set('date', action.date);
    case LOAD_RESERVATIONS_SUCCESS:
      if (
        action &&
        action.resource &&
        action.resource.authentication === 'strong'
      ) {
        return state
          .set('resource', fromJS(action.resource))
          .set('scene', 'StrongAuth');
      }
      return state.set('resource', fromJS(action.resource));

    case CHANGE_SCENE:
      return state.set('scene', action.scene);
    case CHANGE_SLOT:
      return state.set('selectedSlot', action.selectedSlot);
    case MAKE_RESERVATION_ERROR:
      return state.set('scene', 'Error').set('errorMessage', action.error);
    case MAKE_RESERVATION_COMPLETED:
      return state.set('scene', 'Verify');
    default:
      return state;
  }
}

export default homeReducer;
