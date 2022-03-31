import {types} from '../actionTypes';

const {LOGIN_USER} = types;

// * middleware
export const loginUser = (dispatch, loginData) => {
  // Todo: create API call1

  // ! only dummy call to test middleware
  dispatch({
    type: LOGIN_USER,
    loginData,
  });
};
