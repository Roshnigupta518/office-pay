import {prettyPrint} from '../../global/utils/helperFunctions';

export const login = async loginData => {
  // Todo: add API call to login user

  const {email, password} = loginData;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "login" api with data - ${email}, ${password}`);
      resolve();
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
