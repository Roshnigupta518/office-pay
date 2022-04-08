import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

const DefaultInput = props => (
  <Input
    allowFontScaling={false}
    containerStyle={styles.inputCont}
    selectionColor={lightTheme.PRIMARY_COLOR}
    style={[styles.input, props.style]}
    errorStyle={globalStyles.textDanger}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {},
  inputCont: {
    paddingHorizontal: 10,
  },
});

export default DefaultInput;
