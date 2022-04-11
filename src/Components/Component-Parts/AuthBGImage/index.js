import React from 'react';
import {StatusBar, StyleSheet, Text, View, Image} from 'react-native';
// import {Image} from 'react-native-elements';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

const AuthBgImage = () => {
  return (
    <View style={styles.cont}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={globalStyles.flexEnd}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/authTopRightBG.png')}
        />
      </View>
    </View>
  );
};

export default AuthBgImage;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: lightTheme.THEME,
  },
  image: {
    width: 115,
    height: 90,
  },
});
