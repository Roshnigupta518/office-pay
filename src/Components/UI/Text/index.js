import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {fonts} from '../../../global/fonts';

const DefaultText = ({style, children, ...props}) => {
  return (
    <Text
      {...props}
      ellipsizeMode={'tail'}
      allowFontScaling={false}
      style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    color: fonts.fontColor.text,
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.regular,
  },
});
