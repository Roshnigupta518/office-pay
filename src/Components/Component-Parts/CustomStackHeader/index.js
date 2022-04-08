import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../../../global/Styles';

import {lightTheme} from '../../../global/Theme';
import {getImageSrc} from '../../../global/utils/helperFunctions';

const CustomStackHeader = ({goBack}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={lightTheme.THEME} barStyle="dark-content" />
      <View style={styles.headerLeft}>
        <Icon
          name={'left'}
          type={'antdesign'}
          color={lightTheme.PRIMARY_TEXT}
          size={25}
          onPress={goBack}
        />
      </View>
      <View style={styles.headerCenter}>
        {/* Todo: replace text with logo */}
        {/* <Text style={globalStyles.accentHeading}>OfficePay</Text> */}
        <Image
          source={getImageSrc(
            require('../../../assets/images/placeholders/imgpsh.png'),
          )}
          style={styles.logo}
        />
      </View>
      <View style={styles.headerRight} />
    </View>
  );
};

export default CustomStackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    backgroundColor: lightTheme.THEME,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerCenter: {
    width: '60%',
    ...globalStyles.placeCenter,
  },
  headerRight: {
    width: '20%',
  },
  headerLeft: {
    width: '20%',
  },
  logo: {
    width: '60%',
    height: 50,
    resizeMode: 'contain',
  },
});
