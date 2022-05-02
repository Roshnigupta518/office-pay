import {create} from 'apisauce';
import {dummyProperties} from '../../assets/dummy_data';
import {
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {API_BASE_URL} from '../../assets/Constants';

export const addBank = async bankData => {
  // Todo: uncomment below implementation once errors fixed on server side
  console.log(`calling "banks" api with data - `);
  prettyPrint({bankData});

  const api = create({baseURL: API_BASE_URL});
  const response = await api.post('/banks', bankData);

  prettyPrint({response});

  if (response.ok) {
    return handleAPISuccessResponse(response);
  } else {
    console.log('add bank error => ', response.status);
    handleAPIErrorResponse(response, 'add bank user');
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(bankData);
    }, 3000);
  });
};

export const getBanks = async () => {
  // Todo: uncomment below implementation once errors fixed on server side
  // console.log(`calling "banks with GET" api with data - `);

  // const api = create({baseURL: API_BASE_URL});
  // const response = await api.get('/banks');

  // prettyPrint({response});

  // if (response.ok) {
  //   return response.data;
  // } else {
  //   console.log('get bank error => ', response.status);
  //   handleAPIErrorResponse(response, 'get bank user');
  // }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "banks with GET" api with data - `);

      resolve(dummyProperties);
    }, 3000);
  });
};
