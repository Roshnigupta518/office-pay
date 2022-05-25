import {create} from 'apisauce';

import {API_BASE_URL} from '../../assets/Constants';

import {
  getQueryString,
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {dummyInvoiceDashboard} from '../../assets/dummy_data';
import cache from '../../global/utils/cache';

export const createInvoice = async (token, invoiceData, addInQuery = false) => {
  console.log(`calling "invoice-create" api with data - `);
  prettyPrint({invoiceData});

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data',
    },
  });
  let response;

  if (addInQuery) {
    response = await api.post('/invoice-create' + getQueryString(invoiceData));
  } else {
    response = await api.post('/invoice-create', invoiceData);
  }

  // prettyPrint({response});

  if (response.ok) {
    return handleAPISuccessResponse(response);
  } else {
    console.log('create invoice error => ', response.status);
    handleAPIErrorResponse(response, 'create invoice');
  }
};

export const getInvoices = async (token, office_id = false) => {
  console.log(`calling "invoice with GET" api with data - `);

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await api.post(
    '/invoice-list' + (office_id ? getQueryString({office_id}) : ''),
  );

  // prettyPrint({response});

  if (response.ok) {
    const data = handleAPISuccessResponse(response);

    await cache.store('invoice', data);

    return data;
  }
  // else {
  //   console.log('get building error => ', response.status);
  //   handleAPIErrorResponse(response, 'get building user');
  // }

  const cache_data = await cache.get('invoice');

  if (cache_data) {
    console.log('INFO: using cached invoice data');
    return cache_data;
  }

  console.log('get invoice error => ', response.status);
  handleAPIErrorResponse(response, 'get invoice');

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log(`Todo: call "invoice with GET" api with data - `);

  //     resolve(dummyInvoiceDashboard);
  //   }, 3000);
  // });
};
