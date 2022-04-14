import {prettyPrint} from '../../global/utils/helperFunctions';

export const createRazorpayOrder = async orderDetails => {
  // Todo: add API call to create order

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Todo: call "create razorpay order" api with data - `);
      prettyPrint({orderDetails});

      resolve({
        status: 1,
        order_id: 'dummy_order_id',
      });
    }, 3000);
  });
};

export const saveRazorpayCheckoutResponse = async checkoutResp => {
  // Todo: add API call to save response

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(
        `Todo: call "save razorpay checkout response" api with data - `,
      );
      prettyPrint({checkoutResp});

      resolve({
        status: 1,
      });
    }, 3000);
  });
};
