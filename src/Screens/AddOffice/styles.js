import {StyleSheet} from 'react-native';
import {lightTheme} from '../../global/Theme';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },
  pagetitleCont: {
    alignItems: 'center',
    marginVertical: 20,
  },

  form: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
});
