import {StyleSheet} from 'react-native';
import {fonts} from '../../../global/fonts';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

export const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
    // paddingVertical: 50,
    // paddingTop: 80,
    paddingHorizontal: 15,
  },
  title: {
    color: lightTheme.PRIMARY_TEXT,
    fontSize: 22,
  },
  radios: {
    ...globalStyles.flexRow,
    justifyContent: 'space-around',
    // marginVertical: 20,
  },
  form: {
    marginVertical: 50,
  },
  icon: {
    paddingHorizontal: 5,
  },
  lockIcon: {
    paddingRight: 10,
  },
  loginBtnCont: {
    width: '50%',
    marginTop: 60,
    alignSelf: 'center',
  },
  loginBtn: {
    fontSize: fonts.fontSize.large,
    fontFamily: fonts.family.fontBold,
  },
  secondaryMsg: {
    marginVertical: 10,
    alignItems: 'center',
    ...globalStyles.flexRow,
    ...globalStyles.placeCenter,
    flex:1
  },
  forgotPwdCont: {
    alignItems: 'flex-end',
  },
  forgotPwd: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
  },
});
