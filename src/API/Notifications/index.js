import {dummyNotifsDashboard} from '../../assets/dummy_data';

export const getNotifications = async () => {
  // Todo: add API call to add building

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "invoice with GET" api with data - `);

      resolve(dummyNotifsDashboard);
    }, 3000);
  });
};
