import {types} from '../actionTypes';

const {LOGIN_USER, LOGOUT_USER} = types;

const INITIAL_STATE = {
  userLogin: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLogin: true,
        ...action.data,
      };

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
