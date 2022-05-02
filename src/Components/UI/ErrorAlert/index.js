import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fonts} from '../../../global/fonts';

import Alert from '../Alert';
import Text from '../Text';

const ErrorAlert = ({errText, alertProps}) => {
  return (
    <Alert {...alertProps}>
      <View style={styles.container}>
        <Text style={styles.heading}>Error</Text>
        <Text style={styles.text}>{errText}</Text>
      </View>
    </Alert>
  );
};

export default ErrorAlert;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: fonts.fontSize.xlarge,
    color: fonts.fontColor.error,
    fontFamily: fonts.family.fontBold,
  },
  text: {
    fontSize: fonts.fontSize.large,
    color: fonts.fontColor.dark,
  },
});
