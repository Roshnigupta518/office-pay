import {types} from '../actionTypes';

const {INTRO_DONE} = types;

const INITIAL_STATE = false;

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INTRO_DONE:
      return true;
    default:
      return state;
  }
};

export default reducer;
