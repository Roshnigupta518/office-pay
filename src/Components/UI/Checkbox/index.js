import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CheckBox} from 'react-native-elements';
import {fonts} from '../../../global/fonts';
import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

const DefaultCheckBox = props => {
  return (
    <CheckBox
      {...props}
      textStyle={globalStyles.textDefault}
      containerStyle={styles.checkBox}
    />
  );
};

export default DefaultCheckBox;

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: lightTheme.THEME,
    borderWidth: 0,
  },
});
