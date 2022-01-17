import {StyleSheet} from 'react-native';

import {fonts} from '../fonts';

export const globalStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  placeCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDefault: {
    color: fonts.fontColor.text,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.regular,
  },
  heading: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
  },
  headingWhite: {
    color: fonts.fontColor.white,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
  },
  fontDefault: {
    fontFamily: fonts.family.fontRegular,
  },
  anchor: {
    color: fonts.fontColor.primary,
    fontFamily: fonts.family.fontSemiBold,
    padding: 5,
  },
  leftSeperator: {
    marginLeft: 10,
  },
  touchable: {
    padding: 10,
  },
});
