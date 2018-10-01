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
  CHANGE_USERNAME,
  LOAD_RESERVATIONS_SUCCESS,
  INIT_CLOCK,
  CHANGE_SCENE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  currentTime: false,
  resource: null,
  scene: 'Start',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CLOCK:
      return state.set('date', action.date);
    case LOAD_RESERVATIONS_SUCCESS:
      return state.set('resource', fromJS(action.resource));
    case CHANGE_SCENE:
      return state.set('scene', action.scene);
    default:
      return state;
  }
}

export default homeReducer;
