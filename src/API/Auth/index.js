import {create, CancelToken} from 'apisauce';

import {API_BASE_URL} from '../../assets/Constants';
import {
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
  getQueryString,
} from '../../global/utils/helperFunctions';

export const login = async loginData => {
  console.log(
    `calling "login" api with data - ${loginData.email}, ${loginData.password}`,
  );

  const api = create({baseURL: API_BASE_URL});
  const response = await api.post('/login', loginData);

  // * this value will represent if the user loggin,
  // * in is an office owner / building owner
  // Todo: toggle depending on the login response
  const buildingOwner = true;
  const userID = 2; // ! static

  // prettyPrint({response});

  if (response.ok) {
    return {buildingOwner, access_token: response.data.access_token, userID};
  } else {
    console.log('login error => ', response.status);
    handleAPIErrorResponse(response, 'login user');
  }
};

export const logout = async reqData => {
  console.log(`calling "logout"`);

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${reqData.access_token}`,
      Accept: 'application/json',
    },
  });

  const response = await api.post('/logout');

  // prettyPrint({response});

  if (response.ok) {
    console.log({resp: handleAPISuccessResponse(response)});
    return handleAPISuccessResponse(response);
  } else {
    console.log('logout error => ', response.status);
    handleAPIErrorResponse(response, 'logout user');
  }
};

export const signUp = async signUpData => {
  console.log('calling "signUp" api with data - ');
  prettyPrint({signUpData});

  const api = create({baseURL: API_BASE_URL});
  const response = await api.post('/register' + getQueryString(signUpData));

  if (response.ok) {
    return response.data;
  } else {
    console.log('signUp error => ', response.status);
    handleAPIErrorResponse(response, 'register user');
  }
};
