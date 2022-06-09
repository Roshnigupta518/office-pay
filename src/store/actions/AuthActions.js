import {types} from '../actionTypes';

import {logout, login} from '../../API/Auth';

const {LOGIN_USER, LOGOUT_USER} = types;

// * middleware
export const loginUser = loginData => {
  return async dispatch => {
    const {buildingOwner, access_token, userID} = await login(loginData);

    console.log({buildingOwner, userID});

    dispatch({
      type: LOGIN_USER,
      data: {
        buildingOwner,
        access_token,
        userID,
      },
    });
  };
};

export const logoutUser = reqData => {
  return async dispatch => {
    await logout(reqData);

    dispatch({
      type: LOGOUT_USER,
    });
  };
};
