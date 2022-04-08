import {StyleSheet} from 'react-native';
import {fonts} from '../../../global/fonts';
import {globalStyles} from '../../../global/Styles';

import {lightTheme} from '../../../global/Theme';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },
  container: {
    paddingHorizontal: 15,
    position: 'relative',
    top: -30,
  },
  header: {
    ...globalStyles.flexRow,
    justifyContent: 'space-around',
  },
  headerLeft: {
    width: '30%',
  },
  headerRight: {
    width: '30%',
  },
  pageTitle: {
    marginTop: 30,
  },
  avatar: {
    width: '100%',
    height: 200,
    marginVertical: 25,
    ...globalStyles.placeCenter,
  },
  uploadImageBtnCont: {
    marginVertical: 50,
    borderTopColor: lightTheme.PRIMARY_TEXT,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  uploadImageBtn: {
    ...globalStyles.flexRow,
  },
  uploadImageBtnText: {
    color: fonts.fontColor.primary,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
    marginLeft: 15,
  },
});
