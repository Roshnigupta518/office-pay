import {Dimensions, StyleSheet} from 'react-native';
import {fonts} from '../../../global/fonts';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    height: Dimensions.get('window').height - 90,
    backgroundColor: lightTheme.THEME,
    // justifyContent: 'space-between',
  },
  cont: {
    // paddingVertical: 50,
    // paddingTop: 80,
    paddingHorizontal: 15,
  },
  title: {
    color: lightTheme.PRIMARY_TEXT,
    fontSize: 22,
  },
  form: {
    // marginTop: 50,
  },
  radios: {
    ...globalStyles.flexRow,
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  icon: {
    paddingHorizontal: 5,
  },
  lockIcon: {
    paddingRight: 10,
  },
  signUpBtnCont: {
    width: '50%',
    alignSelf: 'center',
  },
  signUpBtnTitle: {
    fontSize: fonts.fontSize.large,
    fontFamily: fonts.family.fontBold,
  },
  secondaryMsg: {
    marginVertical: 10,
    alignItems: 'center',
    ...globalStyles.flexRow,
    ...globalStyles.placeCenter,
  },
  forgotPwdCont: {
    alignItems: 'flex-end',
  },
  forgotPwd: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    // position: 'absolute',
    // top: -50,
  },
  footerTextCont: {
    // width: '100%',
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: fonts.family.fontSemiBold,
    color: fonts.fontColor.dark,
  },
  footerLine: {
    width: 100,
    marginHorizontal: 15,
    height: 1,
    backgroundColor: lightTheme.PRIMARY_TEXT,
  },
  footerBg: {
    width: '100%',
    height: 50,
    backgroundColor: lightTheme.PRIMARY_COLOR,
    position: 'relative',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerRelativeCont: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  footerIconsContInner: {
    width: '80%',
    // backgroundColor: 'red',
    // ...globalStyles.flexRow,
    // justifyContent: 'space-around',
  },
});
