export const lightTheme = {
  THEME: '#ffffff',
  PRIMARY_COLOR: '#1a69ae',
  PRIMARY_COLOR_LIGHT: '#9dbfdd',
  PRIMARY_TEXT: '#1c1c1c',
  SECONDARY_TEXT: '#969696',

  // Accents
  RECEIVED_ACCENT: '#BAD8B3',
  PAID_ACCENT: '#42FF00',
  PENDING_ACCENT: '#FEFFB3',
  OVERDUE_ACCENT: '#FFBFBF',

  // Symbolic
  DANGER: '#FF0000',
  SUCCESS: '#187A00',
  WARNING: '#FFB800',
};

export const rnElementsTheme = {
  colors: {
    primary: lightTheme.PRIMARY_COLOR,
    secondary: lightTheme.SECONDARY_COLOR,
  },
  Button: {
    titleProps: {
      allowFontScaling: false,
    },
  },
};
