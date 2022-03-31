import {StyleSheet} from 'react-native';
import {fonts} from '../../global/fonts';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },

  //  header
  headerCont: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: lightTheme.PRIMARY_COLOR,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addPropertyLink: {
    ...globalStyles.anchor,
    textDecorationLine: 'underline',
    paddingRight: 0,
  },

  markerItem: {
    ...globalStyles.flexRow,
    alignItems: 'center',
    marginRight: 15,
  },

  marker: {
    width: 15,
    height: 15,
    borderRadius: 2,
    backgroundColor: lightTheme.SECONDARY_TEXT,
    marginRight: 5,
  },

  markerOccpied: {
    backgroundColor: lightTheme.PRIMARY_COLOR,
  },

  markerText: {
    fontSize: fonts.fontSize.small,
  },

  // Body
  bodyCont: {
    flex: 1,
    ...globalStyles.placeCenter,
  },

  msgCont: {
    width: '50%',
    alignSelf: 'center',
  },
  msgtitle: {
    marginBottom: 10,
    ...globalStyles.placeCenter,
  },
  msgText: {
    marginBottom: 10,
    ...globalStyles.placeCenter,
  },

  loadingCont: {
    flex: 1,
    ...globalStyles.placeCenter,
  },

  tabContainerStyles: {
    marginTop: 0,
    paddingHorizontal: 20,
  },

  tabBarContStyles: {
    elevation: 0,
    borderRadius: 5,
  },

  tabItemStyle: {
    width: 50,
    backgroundColor: 'yellow',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightColor: lightTheme.SECONDARY_TEXT, 
    borderLeftColor: lightTheme.SECONDARY_TEXT, 
  },

  tabLabelBtnStyle: {
    // width: 50,
    // paddingTop: 10,
    // alignItems: 'flex-start',
    paddingHorizontal: 0,
  },

  tabLabelTitleStyle: {
    fontSize: fonts.fontSize.small,
    marginTop: 0,
    // paddingHorizontal: 0,
  },
});
