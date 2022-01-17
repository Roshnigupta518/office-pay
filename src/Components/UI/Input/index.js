import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {lightTheme} from '../../../global/Theme';

const DefaultInput = props => (
  <Input
    {...props}
    allowFontScaling={false}
    containerStyle={styles.inputCont}
    selectionColor={lightTheme.PRIMARY_COLOR}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {},
  inputCont: {
    paddingHorizontal: 10,
  },
});

export default DefaultInput;
