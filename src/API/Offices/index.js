import {dummyOffices, dummyOfficesDashBoard} from '../../assets/dummy_data';
import {prettyPrint} from '../../global/utils/helperFunctions';

export const addOffice = async office => {
  // Todo: add API call to get offices from server

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      prettyPrint({addOfficeHandler: office});
      resolve({
        success: 1,
      });
    }, 3000);
  });
};

export const getOffices = async () => {
  // Todo: add API call to get offices from server

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(formatOfficeResponse(dummyOffices));
    }, 3000);
  });
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
