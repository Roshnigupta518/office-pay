import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

import Text from '../../../Components/UI/Text';
import Button from '../../../Components/UI/Button';

import {getShadowProperties} from '../../../global/utils/helperFunctions';
import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import {fonts} from '../../../global/fonts';
import WithFileDownloader from '../../HOCs/FileDownloader';

const InvoiceItem = ({invoiceDetails, dontShowProperty, buildingOwner, t}) => {
  const DownloadFile = WithFileDownloader(({handleDownload}) => (
    <Pressable
      onPress={() =>
        handleDownload(
          invoiceDetails.invoiceURL,
          `invoice_${invoiceDetails.officeNumber}_${invoiceDetails.invoiceSubject}_${invoiceDetails.id}.jpg`, // ! change ext to pdf
        )
      }
      style={globalStyles.flexRow}>
      <Icon
        type="ionicon"
        name={'ios-document-text-outline'}
        color={lightTheme.PRIMARY_COLOR}
      />
      <Text style={styles.download}>{t('officeDetails.invoices.item.download')}</Text>
    </Pressable>
  ));

  return (
    <View style={styles.itemCont}>
      {!dontShowProperty && (
        <View style={styles.row}>
          <Text style={styles.buildName}>{invoiceDetails.building_name}</Text>
          <View style={globalStyles.flexRow}>
            <View style={styles.wingCont}>
              <Text style={styles.heading}>{t('officeDetails.invoices.item.wing')}</Text>
              <Text style={styles.value}>{invoiceDetails.wing}</Text>
            </View>
            <View style={globalStyles.flexRow}>
              <Text style={styles.heading}>{t('officeDetails.invoices.item.floor')}</Text>
              <Text style={styles.value}>{invoiceDetails.floor_number}</Text>
            </View>
          </View>
        </View>
      )}
      {!dontShowProperty && (
        <View style={styles.row}>
          <View style={globalStyles.flexRow}>
            <Text style={styles.officeNum}>{invoiceDetails.office_number}</Text>
            <Text style={styles.officeName}>{invoiceDetails.office_name}</Text>
          </View>

          <View style={globalStyles.flexRow}>
            <Text style={styles.heading}>{t('officeDetails.invoices.item.dueDate')}</Text>
            <Text style={styles.value}>{invoiceDetails.invoice_due_date}</Text>
          </View>
        </View>
      )}

      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>{t('officeDetails.invoices.item.invoiceDate')}</Text>
          <Text style={styles.value}>{invoiceDetails.invoice_date}</Text>
        </View>
        <View
          style={[
            styles.status,
            parseInt(invoiceDetails.status, 10) === 0
              ? {backgroundColor: lightTheme.DANGER}
              : {backgroundColor: lightTheme.SUCCESS},
          ]}>
          <Text style={[styles.statusText]}>
            {parseInt(invoiceDetails.status, 10) === 0 ? 'Overdue' : 'Paid'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.value, styles.invoiceSub]}>
          {invoiceDetails.invoice_dec}
        </Text>
        <Text style={[styles.value, styles.invoiceAmt]}>
          {invoiceDetails.total}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={globalStyles.flexRow}>
          <Text style={styles.heading}>{t('officeDetails.invoices.item.reminder')}</Text>
          <Text style={styles.value}>
            {invoiceDetails.lastReminderDate || 'N/A'}
          </Text>
        </View>
        <DownloadFile />
      </View>
      {buildingOwner ? (
        <View style={styles.row}>
          <Button
            titleStyle={styles.btntitle}
            containerStyle={styles.btnCont}
            onPress={() => {
              // Todo: handle send reminder
            }}
            title={t('officeDetails.invoices.item.sendReminder')}
          />
          <Button
            titleStyle={styles.btntitleOutline}
            containerStyle={styles.btnCont}
            btnStyle={styles.btnOutline}
            onPress={() => {
              // Todo: handle send reminder
            }}
            title={t('officeDetails.invoices.item.markReceived')}
          />
        </View>
      ) : (
        // parseInt(invoiceDetails.status, 10) === 0 ? (
        //   <View style={styles.row}>
        //     <Button
        //       titleStyle={styles.btntitle}
        //       containerStyle={styles.btnContFull}
        //       onPress={() => {
        //         // Todo: handle Pay now
        //       }}
        //       title={'Pay Now'}
        //     />
        //   </View>
        // ) :
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
    paddingHorizontal: 10,
    paddingTop: 3,
    borderRadius: 15,
    marginBottom: 5,
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
