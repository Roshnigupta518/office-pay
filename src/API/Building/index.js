import {dummyProperties} from '../../assets/dummy_data';
import {prettyPrint} from '../../global/utils/helperFunctions';

export const addBuidling = async buildingData => {
  // Todo: add API call to add building

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "buildings" api with data - `);
      prettyPrint({buildingData});
      resolve(buildingData);
    }, 3000);
  });
};

export const getBuidlings = async () => {
  // Todo: add API call to add building

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "buildings with GET" api with data - `);

      resolve(dummyProperties);
    }, 3000);
  });
};
