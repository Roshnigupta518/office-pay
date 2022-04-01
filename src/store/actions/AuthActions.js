import {types} from '../actionTypes';

import {login} from '../../API/Auth';

const {LOGIN_USER} = types;

// * middleware
export const loginUser = async (dispatch, loginData) => {
  await login(loginData);

  dispatch({
    type: LOGIN_USER,
  });
};
