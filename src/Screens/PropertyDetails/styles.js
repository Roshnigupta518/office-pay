import {StyleSheet} from 'react-native';
import {fonts} from '../../global/fonts';
import {globalStyles} from '../../global/Styles';

import {lightTheme} from '../../global/Theme';
import {getShadowProperties} from '../../global/utils/helperFunctions';

export const styles = StyleSheet.create({
  view: {
    backgroundColor: lightTheme.THEME,
  },
  invoiceCont: {
    marginHorizontal: 10,
    marginTop: 15,
    paddingBottom: 100,
  },
  showMore: {
    ...globalStyles.anchor,
    textDecorationLine: 'underline',
    paddingRight: 0,
  },
  officeImgCont: {
    width: '95%',
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 4,
    margin: 10,
    ...getShadowProperties(10),
  },
  officeImg: {
    width: '100%',
    height: '100%',
  },

  officeDetailsCont: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: lightTheme.THEME,
    borderRadius: 5,
    ...getShadowProperties(5),
  },

  officeNum: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.semiRegular,
    color: fonts.fontColor.primary,
    textDecorationLine: 'underline',
  },

  editOfficeDetails: {
    ...globalStyles.flexRow,
  },
  editIcon: {
    marginBottom: 5,
  },
  editText: {
    fontFamily: fonts.family.fontLight,
    fontSize: fonts.fontSize.semiRegular,
  },

  nameAddCont: {
    marginVertical: 5,
  },

  officeName: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.large,
    color: fonts.fontColor.dark,
  },

  officeAddress: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  paymentDetailsCont: {
    marginVertical: 5,
  },

  pendingAmtHead: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  pendingAmt: {
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
    color: fonts.fontColor.warning,
  },
  invoiceAmt: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.grey,
  },

  createInvoiceBtnCont: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 20,
  },
  createInvoiceBtnTitle: {
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.white,
  },

  invoiceHeaderCont: {
    backgroundColor: lightTheme.PRIMARY_COLOR_LIGHT,
    width: '100%',
    height: 40,
    ...globalStyles.placeCenter,
  },

  loaderCont: {
    ...globalStyles.placeCenter,
    paddingTop: 40,
    paddingRight: 30,
  },
});
