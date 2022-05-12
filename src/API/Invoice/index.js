import {create} from 'apisauce';

import {API_BASE_URL} from '../../assets/Constants';

import {
  getQueryString,
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {dummyInvoiceDashboard} from '../../assets/dummy_data';

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

  prettyPrint({response});

  if (response.ok) {
    return handleAPISuccessResponse(response);
  } else {
    console.log('create invoice error => ', response.status);
    handleAPIErrorResponse(response, 'create invoice');
  }
};

export const getInvoices = async () => {
  // Todo: add API call to add building

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "invoice with GET" api with data - `);

      resolve(dummyInvoiceDashboard);
    }, 3000);
  });
};
