import {types} from '../actionTypes';

import {login} from '../../API/Auth';

const {LOGIN_USER, LOGOUT_USER} = types;

// * middleware
export const loginUser = loginData => {
  return async dispatch => {
    const buildingOwner = await login(loginData);

    dispatch({
      type: LOGIN_USER,
      buildingOwner,
    });
  };
};

export const logoutUser = () => {
  return async dispatch => {
    // const buildingOwner = await login(loginData);

    dispatch({
      type: LOGOUT_USER,
    });
  };
};
