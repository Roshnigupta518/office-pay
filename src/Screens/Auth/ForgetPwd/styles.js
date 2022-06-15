import {StyleSheet} from 'react-native';

import {fonts} from '../../../global/fonts';
import {globalStyles} from '../../../global/Styles';
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
  sendLinkBtnTitle: {
    marginTop: 5,
    fontSize: fonts.fontSize.large,
    fontFamily: fonts.family.fontRegular,
  },
  secondaryMsg: {
    marginTop: 20,
    ...globalStyles.flexRow,
    alignSelf: 'center',
  },
  anchor: {
    padding: 0,
    marginTop: 5,
  },
  arrowIcon: {
    marginRight: 5,
  },
});
