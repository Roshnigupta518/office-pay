import {lightTheme} from '../Theme';

export const fonts = {
  family: {
    fontRegular: 'Poppins-Regular',
    fontLight: 'Poppins-Light',
    fontBold: 'Poppins-Bold',
    fontSemiBold: 'Poppins-SemiBold',
    familyName: 'Poppins', // for web purposes
  },
  fontSize: {
    xsmall: 8,
    small: 12,
    semiRegular: 14,
    regular: 16,
    semiLarge: 18,
    large: 20,
    xlarge: 22,
  },
  fontColor: {
    dark: '#000',
    grey: '#8E8E8E',
    text: '#494949',
    primary: lightTheme.PRIMARY_COLOR,
    white: '#fff',
    warning: '#ffb800',
    error: lightTheme.DANGER,
  },
};
