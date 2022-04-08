import {Dimensions, StyleSheet} from 'react-native';

import {lightTheme} from '../../global/Theme';
import {fonts} from '../../global/fonts';
import {getShadowProperties} from '../../global/utils/helperFunctions';

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
    bottom: 100,
    // top: Dimensions.get('window').height - 65,
    zIndex: 100,
    backgroundColor: lightTheme.THEME,
    paddingVertical: 20,
    ...getShadowProperties(10)
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
});
