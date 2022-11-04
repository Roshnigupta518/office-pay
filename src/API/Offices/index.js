import {create} from 'apisauce';
import {API_BASE_URL} from '../../assets/Constants';
import {dummyOffices, dummyOfficesDashBoard} from '../../assets/dummy_data';
import cache from '../../global/utils/cache';
import {
  getQueryString,
  handleAPIErrorResponse,
  handleAPISuccessResponse,
  prettyPrint,
} from '../../global/utils/helperFunctions';

export const addOffice = async (office, addInQuery = false) => {
  console.log(`calling "offices" api with data - `);
  prettyPrint({office});

  const api = create({baseURL: API_BASE_URL});
  let response;

  if (addInQuery) {
    response = await api.post('/offices' + getQueryString(office));
  } else {
    response = await api.post('/offices', office);
  }

  // prettyPrint({response});

  if (response.ok) {
    return {
      success: 1,
      data: handleAPISuccessResponse(response),
    };
  } else {
    console.log('add office error => ', response.status);
    handleAPIErrorResponse(response, 'add office');
  }

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     prettyPrint({addOfficeHandler: office});
  //     resolve({
  //       success: 1,
  //     });
  //   }, 3000);
  // });
};

export const getOffices = async (id, token) => {
  console.log(`calling "offices with GET" api with data - ${id}`);

  // Todo: send building id in API request

  if (!id) {
    return null;
  }

  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // const response = await api.get(`/getOfficeList/${id}`);
  const response = await api.get(`/getOffices`);

  // prettyPrint({response});

  if (response.ok) {
    // return formatOfficeResponse(handleAPISuccessResponse(response));

    // const rawData = handleAPISuccessResponse(response);
    const rawData = response.data.data;

    prettyPrint({rawData});

    // const data = rawData && rawData.length ? formatOfficeResponse(rawData) : [];

    // await cache.store('offices', data);

    return rawData;
  }
  // else {
  //   console.log('get office error => ', response.status);
  //   handleAPIErrorResponse(response, 'get office user');
  // }

  const cache_data = await cache.get('offices');

  if (cache_data) {
    console.log('INFO: using cached offices data');
    return cache_data;
  }

  console.log('get office error => ', response.status);
  handleAPIErrorResponse(response, 'get office user');

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(formatOfficeResponse(dummyOffices));
  //   }, 3000);
  // });
};

export const getOfficesDashboard = async () => {
  // Todo: add API call to get offices from server

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dummyOfficesDashBoard);
    }, 3000);
  });
};

const formatOfficeResponse = offices => {
  let formattedByWing = {};

  if (offices && Array.isArray(offices)) {
    offices.map(office => {
      if (Array.isArray(formattedByWing[office.wing])) {
        formattedByWing[office.wing] = [
          ...formattedByWing[office.wing],
          office,
        ];
      } else {
        formattedByWing[office.wing] = [office];
      }
    });
  }

  Object.entries(formattedByWing).map(([wing, offices]) => {
    formattedByWing[wing] = formatOfficeResponseByFloor(offices);
  });

  return formattedByWing;
};

const formatOfficeResponseByFloor = wingOffices => {
  let formattedByFloor = [];

  if (Array.isArray(wingOffices)) {
    let tempObj = {};

    wingOffices.map(office => {
      const floorKey = `Floor_${office.floor_number}`;

      if (
        tempObj.hasOwnProperty(floorKey) &&
        Array.isArray(tempObj[floorKey])
      ) {
        tempObj[floorKey] = [...tempObj[floorKey], office];
      } else {
        tempObj[floorKey] = [office];
      }
    });

    Object.keys(tempObj).map(floor => {
      formattedByFloor.push({
        title: floor.replace('_', ' '),
        data: tempObj[floor],
      });
    });
  }

  return formattedByFloor;
};
