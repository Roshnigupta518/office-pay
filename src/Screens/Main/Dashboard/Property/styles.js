import {StyleSheet} from 'react-native';
import {fonts} from '../../../../global/fonts';
import {globalStyles} from '../../../../global/Styles';
import {lightTheme} from '../../../../global/Theme';

export const styles = StyleSheet.create({
  conatiner: {
    width: '90%',
    flex: 1,
    marginVertical: 10,
  },

  loaderCont: {
    ...globalStyles.placeCenter,
    paddingTop: 40,
    paddingRight: 30,
  },

  sectionHeader: {
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },

  addPropertyLink: {
    ...globalStyles.anchor,
    textDecorationLine: 'underline',
    paddingRight: 0,
  },

  //  list Styles

  listCont: {
    marginBottom: 100,
  },

  // item styles

  propertyItemCont: {
    width: '98%',
    height: 130,
    backgroundColor: lightTheme.THEME,
    elevation: 7,
    ...globalStyles.flexRow,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 0,
  },

  imgCont: {
    width: '40%',
    height: 130,
  },
  detailsCont: {
    width: '60%',
    padding: 10,
  },

  propertyName: {
    ...globalStyles.heading,
  },
  propertyaddress: {
    fontSize: fonts.fontSize.small,
  },
  detailsRow: {
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },
  detailsHeadings: {
    ...globalStyles.heading,
    fontSize: fonts.fontSize.semiRegular,
  },
  detailsValue: {
    ...globalStyles.heading,
    fontSize: fonts.fontSize.semiRegular,
  },
});
