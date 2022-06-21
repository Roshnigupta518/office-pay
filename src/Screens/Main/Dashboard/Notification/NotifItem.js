import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {lightTheme} from '../../../../global/Theme';
import {globalStyles} from '../../../../global/Styles';
import {getShadowProperties} from '../../../../global/utils/helperFunctions';
import {fonts} from '../../../../global/fonts';

const NotifItem = ({notifItem}) => {
  return (
    <View style={styles.notifItemCont}>
      <View style={styles.invoiceNoBlock}>
        <Text style={[styles.invoiceNoBlockText, styles.textlight]}>
          Invoice No
        </Text>
        <Text style={styles.invoiceNoBlockText}>{notifItem.invoice_number}</Text>
      </View>
      <View style={styles.middle}>
        <Text
          numberOfLines={1}
          style={
            globalStyles.heading
          }>{`${notifItem.wing}, ${notifItem.office_number || "N/A"}, ${notifItem.building_name || "N/A"}`}</Text>
        <Text numberOfLines={1} style={globalStyles.textDefault}>
          {notifItem.office_name || "N/A"}
        </Text>
        <Text
          numberOfLines={1}
          style={[globalStyles.textDefault, styles.invSub]}>
          {notifItem.invoice_dec}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            globalStyles.textDefault,
            styles.invSub,
          ]}>{`Invoice Amount ₹ ${notifItem.total}`}</Text>
      </View>
      <View style={styles.rightSection}>
        <View
          style={[
            styles.statusCont,
            {
              backgroundColor: notifItem.invoice_status
                ? lightTheme.SUCCESS
                : lightTheme.DANGER,
            },
          ]}>
          <Text style={styles.statusText}>
            {notifItem.invoice_status ? 'Paid' : 'Overdue'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotifItem;

const styles = StyleSheet.create({
  notifItemCont: {
    backgroundColor: lightTheme.THEME,
    marginBottom: 10,
    padding: 10,
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
    ...getShadowProperties(7),
  },

  invoiceNoBlock: {
    width: '25%',
    height: 75,
    ...globalStyles.placeCenter,
    backgroundColor: lightTheme.PRIMARY_COLOR,
    borderRadius: 10,
  },

  invoiceNoBlockText: {
    ...globalStyles.headingWhite,
    fontSize: fonts.fontSize.semiRegular,
  },

  textlight: {
    fontFamily: fonts.family.fontRegular,
  },

  middle: {
    width: '45%',
    marginHorizontal: 10,
  },

  rightSection: {
    width: '25%',
  },

  statusCont: {
    width: '90%',
    height: 30,
    alignSelf: 'center',
    borderRadius: 25,
    ...globalStyles.placeCenter,
  },

  statusText: {
    ...globalStyles.headingWhite,
    fontSize: fonts.fontSize.semiRegular
  },

  invSub: {
    fontSize: fonts.fontSize.small,
  },
});
