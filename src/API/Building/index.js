import {create} from 'apisauce';
import {dummyProperties} from '../../assets/dummy_data';
import {
  getQueryString,
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {API_BASE_URL} from '../../assets/Constants';

export const addBuilding = async (buildingData, addInQuery = false) => {
  console.log(`calling "buildings" api with data - `);
  prettyPrint({buildingData});

  const api = create({baseURL: API_BASE_URL});
  let response;

  if (addInQuery) {
    response = await api.post('/buildings' + getQueryString(buildingData));
  } else {
    response = await api.post('/buildings', buildingData);
  }

  // prettyPrint({response});

  if (response.ok) {
    return handleAPISuccessResponse(response);
  } else {
    console.log('add building error => ', response.status);
    handleAPIErrorResponse(response, 'add building user');
  }

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(buildingData);
  //   }, 3000);
  // });
};

export const getBuildings = async () => {
  // Todo: uncomment below implementation once errors fixed on server side
  console.log(`calling "buildings with GET" api with data - `);

  const api = create({baseURL: API_BASE_URL});
  const response = await api.get('/buildings');

  // prettyPrint({response});

  if (response.ok) {
    return handleAPISuccessResponse(response);
  } else {
    console.log('get building error => ', response.status);
    handleAPIErrorResponse(response, 'get building user');
  }

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log(`Todo: call "buildings with GET" api with data - `);

  //     resolve(dummyProperties);
  //   }, 3000);
  // });
};
