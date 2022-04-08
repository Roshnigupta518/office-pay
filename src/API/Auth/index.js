import {prettyPrint} from '../../global/utils/helperFunctions';

export const login = async loginData => {
  // Todo: add API call to login user

  const {email, password} = loginData;

  // * this value will represent if the user loggin,
  // * in is an office owner / building owner
  // Todo: toggle depending on the login response
  const buildingOwner = true;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "login" api with data - ${email}, ${password}`);
      resolve(buildingOwner);
    }, 3000);
  });
};

export const signUp = async signUpData => {
  // Todo: add API call to signUp user

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "signUp" api with data - `);
      prettyPrint({signUpData});
      resolve();
    }, 3000);
  });
};
