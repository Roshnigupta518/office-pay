import React, { useState } from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect, useSelector} from 'react-redux';

import Text from '../../../../Components/UI/Text';
import Button from '../../../../Components/UI/Button';
import WithPaymentPerformer from '../../../../Components/HOCs/PaymentPerformer';

import {globalStyles} from '../../../../global/Styles';
import {fonts} from '../../../../global/fonts';
import {getShadowProperties} from '../../../../global/utils/helperFunctions';
import {lightTheme} from '../../../../global/Theme';

import {markInvoiceReceived} from '../../../../API/Invoice';

const InvoiceItem = ({invoiceDetails, buildingOwner, auth}) => {
  const [loading, setLoading] = useState(false);

  // payment HOC
  const WithPay = WithPaymentPerformer(
    ({handlePay}) => (
      <View style={styles.row}>
        <Button
          titleStyle={styles.btntitle}
          containerStyle={styles.btnContFull}
          onPress={() => {
            // Todo: handle Pay now

            const paymentDetails = {
              amount: 200,
              invoiceDesc: invoiceDetails.invoiceSubject,
              ...invoiceDetails,
            };

            handlePay(paymentDetails);
          }}
          title={'Pay Now'}
        />
      </View>
    ),
    () => console.log('INFO: payment success'),
    () => console.log('INFO: payment error'),
    auth,
  );

  const {access_token} = useSelector(state => state.auth);

  const markReceived = async () => {
    await markInvoiceReceived(access_token, invoiceDetails.id).catch(e =>
      console.error(e),
    );
  };

  const downloadInvoice = async () => {
    setLoading(true);

    setTimeout(() => {
      console.log('download invoice...');
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.itemCont}>
      <View style={styles.row}>
        <Text style={styles.buildName}>{invoiceDetails.building_name}</Text>
        <View style={globalStyles.flexRow}>
          <View style={styles.wingCont}>
            <Text style={styles.heading}>Wing</Text>
            <Text style={styles.value}>{invoiceDetails.wing}</Text>
          </View>
          <View style={globalStyles.flexRow}>
            <Text style={styles.heading}>Floor</Text>
            <Text style={styles.value}>{invoiceDetails.floor_number}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.officeNum}>{invoiceDetails.office_number}</Text>
          <Text style={styles.officeName}>{invoiceDetails.office_name}</Text>
        </View>

        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>Due Date</Text>
          <Text style={styles.value}>{invoiceDetails.invoice_due_date}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>Invoice Date</Text>
          <Text style={styles.value}>{invoiceDetails.invoice_date}</Text>
        </View>
        <View
          style={[
            styles.status,
            parseInt(invoiceDetails.status, 10) === 0
              ? {backgroundColor: lightTheme.DANGER}
              : {backgroundColor: lightTheme.SUCCESS},
            invoiceDetails.status.toLowerCase() === 'due'
              ? {backgroundColor: lightTheme.DANGER}
              : invoiceDetails.status.toLowerCase() === 'recived'
              ? {backgroundColor: lightTheme.SUCCESS}
              : {backgroundColor: lightTheme.WARNING},
          ]}>
          <Text style={[styles.statusText]}>
            {invoiceDetails.status.toLowerCase() === 'due'
              ? 'Overdue'
              : invoiceDetails.status.toLowerCase() === 'recived'
              ? 'Paid'
              : 'Pending'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.value, styles.invoiceSub]}>
          {invoiceDetails.invoice_dec}
        </Text>
        <Text style={[styles.value, styles.invoiceAmt]}>
        ₹{invoiceDetails.total}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>Last Reminder</Text>
          <Text style={styles.value}>
            {invoiceDetails.lastReminderDate || 'N/A'}
          </Text>
        </View>

        <Pressable onPress={downloadInvoice} style={globalStyles.flexRow}>
          {loading ? (
            <ActivityIndicator
              size={'small'}
              color={lightTheme.PRIMARY_COLOR}
            />
          ) : (
            <Icon
              type="ionicon"
              name={'ios-document-text-outline'}
              color={lightTheme.PRIMARY_COLOR}
            />
          )}
          <Text style={styles.download}>Download</Text>
        </Pressable>
      </View>
      {buildingOwner ? (
        <View style={styles.row}>
          <Button
            titleStyle={styles.btntitle}
            containerStyle={styles.btnCont}
            onPress={() => {
              // Todo: handle send reminder
            }}
            title={'Send reminder'}
          />
          <Button
            titleStyle={styles.btntitleOutline}
            containerStyle={styles.btnCont}
            btnStyle={styles.btnOutline}
            onPress={markReceived}
            title={'Mark as received'}
          />
        </View>
      ) : (
        //  parseInt(invoiceDetails.status, 10) === 0 ? (
        //   <WithPay />
        // ) :
        <View />
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const {auth} = state;

  return {
    auth,
  };
};

export default connect(mapStateToProps)(InvoiceItem);

const styles = StyleSheet.create({
  itemCont: {
    width: '100%',
    backgroundColor: lightTheme.THEME,
    padding: 10,
    marginBottom: 15,
    ...getShadowProperties(5),
  },
  row: {
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },

  buildName: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiRegular,
  },

  officeNum: {
    color: fonts.fontColor.primary,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.semiRegular,
    marginRight: 15,
  },

  officeName: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.semiRegular,
  },

  status: {
    paddingHorizontal: 10,
    paddingTop: 2,
    borderRadius: 25,
    marginVertical: 5,
    overflow: 'hidden',
    ...globalStyles.placeCenter,
  },

  statusText: {
    ...globalStyles.headingWhite,
    fontSize: fonts.fontSize.regular,
  },

  invoiceSub: {
    fontSize: fonts.fontSize.regular,
  },

  invoiceAmt: {
    fontSize: fonts.fontSize.regular,
    fontFamily: fonts.family.fontSemiBold,
  },

  download: {
    ...globalStyles.anchor,
    fontFamily: fonts.family.fontRegular,
    textDecorationLine: 'underline',
  },

  btnCont: {
    width: '45%',
  },

  btnContFull: {
    width: '100%',
  },

  btnOutline: {
    backgroundColor: lightTheme.THEME,
    borderColor: lightTheme.PRIMARY_COLOR,
    borderWidth: 1,
  },

  btntitleOutline: {
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.primary,
  },

  wingCont: {
    ...globalStyles.flexRow,
    marginRight: 5,
  },

  heading: {
    color: fonts.fontColor.grey,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.small,
    marginRight: 3,
  },
  value: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.small,
  },
});
