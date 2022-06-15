import {StyleSheet} from 'react-native';

import {fonts} from '../../../global/fonts';
import {lightTheme} from '../../../global/Theme';

export const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
    paddingVertical: 50,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  inputCont: {
    marginVertical: 40,
  },
  btnCont: {
    width: '50%',
    alignSelf: 'center',
  },
  lockIcon: {
    paddingRight: 10,
  },
  savePwdBtnTitle: {
    marginTop: 5,
    fontSize: fonts.fontSize.large,
    fontFamily: fonts.family.fontRegular,
  },
});
