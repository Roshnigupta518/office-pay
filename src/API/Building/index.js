import {create} from 'apisauce';

import {
  getQueryString,
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {API_BASE_URL} from '../../assets/Constants';

import cache from '../../global/utils/cache';

export const addBuilding = async (buildingData, token, buildingOwner) => {
  console.log(`calling "buildings" api with data - `);
  prettyPrint({buildingData});

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  
  let response = await api.post(buildingOwner?`/addBuilding`: `/addOffice`, buildingData);

  prettyPrint({response});

  if (response.ok) {
    // return handleAPISuccessResponse(response);
    return response.data
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

export const getBuildings = async token => {
  console.log(`calling "buildings with GET" api with data - `);

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await api.get('/getBuildingList');

  // prettyPrint({response});

  if (response.ok) {
    // const data = handleAPISuccessResponse(response);
    const data = response.data.data;

    await cache.store('buildings', data);

    return data;
  }
  // else {
  //   console.log('get building error => ', response.status);
  //   handleAPIErrorResponse(response, 'get building user');
  // }

  const cache_data = await cache.get('buildings');

  if (cache_data) {
    console.log('INFO: using cached buildings data');
    return cache_data;
  }

  console.log('get building error => ', response.status);
  handleAPIErrorResponse(response, 'get building');

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log(`Todo: call "buildings with GET" api with data - `);

  //     resolve(dummyProperties);
  //   }, 3000);
  // });
};
