import {create} from 'apisauce';
import {API_BASE_URL} from '../../assets/Constants';
import {dummyNotifsDashboard} from '../../assets/dummy_data';

import cache from '../../global/utils/cache';
import {
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

export const getNotifications = async token => {
  // Todo: add API call to add building
  console.log(`calling "buildings with GET" api with data - `);

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await api.get('/invoice-notification');
  // const response = await api.get('https://new.fjsplant.com/api/userList');

  prettyPrint({response: response.data});

  if (response.ok) {
    // const data = handleAPISuccessResponse(response.data);
    const {data} = response.data;

    await cache.store('notifications', data);

    return data;
  }
  // ! else {
  // !   console.log('get building error => ', response.status);
  // !   handleAPIErrorResponse(response, 'get building user');
  // !}

  const cache_data = await cache.get('notifications');

  if (cache_data) {
    console.log('INFO: using cached notifications data');
    return cache_data;
  }

  console.log('get notifications error => ', response.status);
  handleAPIErrorResponse(response, 'get notifications');



  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log(`Todo: call "invoice with GET" api with data - `);

  //     resolve(dummyNotifsDashboard);
  //   }, 3000);
  // });
};
