import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fonts} from '../../../global/fonts';

import {lightTheme} from '../../../global/Theme';

import Text from '../../UI/Text';

const AuthPageTitle = ({title, desc}) => {
  return (
    <View>
      <View style={styles.titleCont}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.descCont}>
        <Text>{desc}</Text>
      </View>
    </View>
  );
};

export default AuthPageTitle;

const styles = StyleSheet.create({
  titleCont: {
    // paddingVertical: 10,
  },
  title: {
    fontSize: fonts.fontSize.xlarge,
    color: fonts.fontColor.dark,
    fontFamily: fonts.family.fontSemiBold,
  },
  desc: {
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.grey,
  },
  hr: {
    width: 50,
    height: 3,
    backgroundColor: lightTheme.PRIMARY_COLOR,
    marginVertical: 10,
  },
});
