import {Dimensions, StyleSheet} from 'react-native';

import {lightTheme} from '../../global/Theme';
import {fonts} from '../../global/fonts';
import {getShadowProperties} from '../../global/utils/helperFunctions';
import {globalStyles} from '../../global/Styles';

export const styles = StyleSheet.create({
  view: {
    position: 'relative',
    paddingBottom: 150,
  },
  scrollview: {
    paddingBottom: 50,
  },
  sendBtnCont: {
    width: '100%',
    position: 'absolute',
    bottom: 90,
    // top: Dimensions.get('window').height - 65,
    zIndex: 100,
    backgroundColor: lightTheme.THEME,
    paddingVertical: 20,
    ...getShadowProperties(10),
  },
  pagetitle: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.dark,
    margin: 10,
  },
  sendInvoiceBtnTitle: {
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.white,
  },
  sendInvoiceBtnCont: {
    borderRadius: 30,
    marginHorizontal: 20,
  },

  createInvoiceHeadCont: {
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  uploadImageBtn: {
    marginRight: 15,
    ...globalStyles.flexRow,
  },
  uploadImageBtnText: {
    color: fonts.fontColor.primary,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
    marginLeft: 10,
  },

  attachmentText: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.semiLarge,
    marginLeft: 10,
  },
});
