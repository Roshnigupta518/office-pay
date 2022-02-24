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
    paddingHorizontal: 20,
  },

  greetingCont: {
    marginVertical: 20,
  },
  greeting: {
    color: fonts.fontColor.primary,
    fontSize: fonts.fontSize.xlarge,
    fontFamily: fonts.family.fontSemiBold,
  },

  // overview

  overviewCont: {
    width: '100%',
    paddingHorizontal: 15,
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },
  overviewTile: {
    width: '30%',
    height: 100,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  overviewText: {
    fontSize: fonts.fontSize.small,
  },
  overviewAmount: {
    fontSize: fonts.fontSize.regular,
    fontFamily: fonts.family.fontSemiBold,
  },
  receivedTile: {
    backgroundColor: lightTheme.RECEIVED_ACCENT,
  },
  pendingTile: {
    backgroundColor: lightTheme.PENDING_ACCENT,
  },
  overdueTile: {
    backgroundColor: lightTheme.OVERDUE_ACCENT,
  },
});
