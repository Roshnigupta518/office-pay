import {StyleSheet} from 'react-native';

import {fonts} from '../fonts';
import {lightTheme} from '../Theme';

export const globalStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
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
  textSmallSecondary: {
    color: fonts.fontColor.grey,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
  },
  heading: {
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
  },
  accentHeading: {
    color: fonts.fontColor.primary,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
  },
  headingWhite: {
    color: fonts.fontColor.white,
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.semiLarge,
  },

  textDanger: {
    color: lightTheme.DANGER,
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
  image: {
    width: '100%',
    height: '100%',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});
