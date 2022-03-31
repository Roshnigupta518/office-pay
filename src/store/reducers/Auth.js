import {types} from '../actionTypes';

const {LOGIN_USER} = types;

const INITIAL_STATE = null;


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...action.loginData
      }

    default:
      return state;
  }
};

export default reducer