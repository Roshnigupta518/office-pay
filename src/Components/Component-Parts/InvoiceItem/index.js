import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

import Text from '../../../Components/UI/Text';
import Button from '../../../Components/UI/Button';

import {getShadowProperties} from '../../../global/utils/helperFunctions';
import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import {fonts} from '../../../global/fonts';

const InvoiceItem = ({invoiceDetails, dontShowProperty, buildingOwner}) => {
  return (
    <View style={styles.itemCont}>
      {!dontShowProperty && (
        <View style={styles.row}>
          <Text style={styles.buildName}>{invoiceDetails.buildingName}</Text>
          <View style={globalStyles.flexRow}>
            <View style={styles.wingCont}>
              <Text style={styles.heading}>Wing</Text>
              <Text style={styles.value}>{invoiceDetails.officeWing}</Text>
            </View>
            <View style={globalStyles.flexRow}>
              <Text style={styles.heading}>Floor</Text>
              <Text style={styles.value}>{invoiceDetails.officeFloor}</Text>
            </View>
          </View>
        </View>
      )}
      {!dontShowProperty && (
        <View style={styles.row}>
          <View style={globalStyles.flexRow}>
            <Text style={styles.officeNum}>{invoiceDetails.officeNumber}</Text>
            <Text style={styles.officeName}>{invoiceDetails.officeName}</Text>
          </View>

          <View style={globalStyles.flexRow}>
            <Text style={styles.heading}>Due Date</Text>
            <Text style={styles.value}>{invoiceDetails.invoiceDueDate}</Text>
          </View>
        </View>
      )}

      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>Invoice Date</Text>
          <Text style={styles.value}>{invoiceDetails.invoiceDate}</Text>
        </View>
        <View
          style={[
            styles.status,
            invoiceDetails.invoiceStatus === 0
              ? {backgroundColor: lightTheme.DANGER}
              : {backgroundColor: lightTheme.SUCCESS},
          ]}>
          <Text style={[styles.statusText]}>
            {invoiceDetails.invoiceStatus === 0 ? 'Overdue' : 'Paid'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.value, styles.invoiceSub]}>
          {invoiceDetails.invoiceSubject}
        </Text>
        <Text style={[styles.value, styles.invoiceAmt]}>
          {invoiceDetails.invoiceAmmount}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>Last Reminder</Text>
          <Text style={styles.value}>{invoiceDetails.lastReminderDate}</Text>
        </View>
        <View style={globalStyles.flexRow}>
          <Icon
            type="ionicon"
            name={'ios-document-text-outline'}
            color={lightTheme.PRIMARY_COLOR}
          />
          <Text style={styles.download}>Download</Text>
        </View>
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
            onPress={() => {
              // Todo: handle send reminder
            }}
            title={'Mark as received'}
          />
        </View>
      ) : invoiceDetails.invoiceStatus === 0 ? (
        <View style={styles.row}>
          <Button
            titleStyle={styles.btntitle}
            containerStyle={styles.btnContFull}
            onPress={() => {
              // Todo: handle Pay now
            }}
            title={'Pay Now'}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default InvoiceItem;

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
    minWidth: 75,
    paddingHorizontal: 5,
    borderRadius: 3,
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
