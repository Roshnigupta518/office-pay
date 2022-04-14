import React from 'react';
import {Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import {
  createRazorpayOrder,
  saveRazorpayCheckoutResponse,
} from '../../../API/Payments';
import {RAZORPAY_KEY_ID} from '../../../assets/Constants';
import {lightTheme} from '../../../global/Theme';
import {prettyPrint} from '../../../global/utils/helperFunctions';

/**
 * @param {React.Component} WrappedComponent
 * @param {Function} onPaymentSuccess callback to run on success
 * @param {Function} onPaymentError callback to run on error
 *
 * Wraps any react component to perform razorpay payment flow
 */

const WithPaymentPerformer = (
  WrappedComponent,
  onPaymentSuccess,
  onPaymentError,
  userDetails,
) => {
  return props => {
    /**
     *
     * @param {*} paymentDetails
     * @returns {string} receiptId
     *
     * get a receipt id made from invoice id, office number and current time
     */
    const getRecieptId = paymentDetails => {
      // Todo: make dynamic

      return `receipt_${paymentDetails.id}_${
        paymentDetails.officeNumber
      }_${Date.now()}`;
    };

    /**
     *
     * @param {*} paymentDetails
     * @returns {Promise}
     *
     * Prompts user to confirm his payment
     */
    const confirmPayment = paymentDetails => {
      return new Promise(resolve => {
        Alert.alert(
          'Pay Invoice Amount',
          `Are you sure to continue with the payment of ${paymentDetails.amount} for ${paymentDetails.invoiceDesc}`,
          [
            {
              text: 'Cancel',
              onPress: () => resolve(false),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => resolve(true),
              style: 'default',
            },
          ],
        );
      });
    };

    /**
     *
     * @param {object} paymentDetails
     * @returns {string} orderId
     *
     * create razorpay order on server
     */
    const createOrder = async paymentDetails => {
      const requestOptions = {
        amount: paymentDetails.amount,
        receipt: getRecieptId(paymentDetails),
        currency: 'INR',
        payment_capture: '1',
      };

      const {order_id, status} = await createRazorpayOrder(
        requestOptions,
      ).catch(err => {
        // Todo: show error to user
        prettyPrint({
          msg: 'Error: in creating razorpay order on server',
          err,
        });
      });

      if (status) {
        return order_id;
      }
      return null;
    };

    /**
     *
     * @param {object} paymentDetails
     * @param {string} orderId
     *
     * @returns {Promise} checkoutResp
     * perform razorpay checkout process
     */
    const performRazorpayCheckout = async (paymentDetails, orderId) => {
      // Todo: open razorpay payments modal

      //  prettyPrint({userDetails});

      return new Promise((resolve, reject) => {
        if (!orderId) {
          reject('please provide order id');
        }

        var options = {
          description: paymentDetails.invoiceDesc,
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: RAZORPAY_KEY_ID,
          amount: paymentDetails.amount,
          name: 'Office Pay',
          order_id: orderId,
          prefill: {
            // update with user details
            email: 'gaurav.kumar@example.com',
            contact: '9191919191',
            name: 'Gaurav Kumar',
          },
          theme: {color: lightTheme.PRIMARY_COLOR},
        };

        RazorpayCheckout.open(options)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    };

    /**
     *
     * @param {object} checkoutResp
     *
     * @returns {string} orderId
     *
     * save checkout response from razorpay to server
     */
    const saveCheckoutResponseOnServer = async checkoutResp => {
      // Todo: call API to save checkout resp to server
      // * also on server make sure to `Verify the Payment signature` sent
      // * sent in checkoutResp

      const {status} = await saveRazorpayCheckoutResponse(checkoutResp).catch(
        err => {
          // Todo: show error to user
          prettyPrint({
            msg: 'Error: in saving checkout response on server',
            err,
          });
        },
      );

      return status;
    };

    /**
     *
     * @param {object} paymentDetails
     *
     * initiate payment process
     */
    const handlePay = async paymentDetails => {
      console.log('INFO: initializing payment process...');

      if (!paymentDetails) {
        console.warn('payment details are required');
        return;
      }

      try {
        const paymentConfirmed = await confirmPayment(paymentDetails);

        console.log({paymentConfirmed});

        if (paymentConfirmed) {
          const orderId = await createOrder(paymentDetails);

          const checkoutresp = await performRazorpayCheckout(
            paymentDetails,
            orderId,
          );

          const success = await saveCheckoutResponseOnServer(checkoutresp);

          if (success) {
            onPaymentSuccess();
          } else {
            onPaymentError();
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return <WrappedComponent {...props} handlePay={handlePay} />;
  };
};

export default WithPaymentPerformer;
