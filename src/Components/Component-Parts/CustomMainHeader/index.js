import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../../../global/Styles';

import {lightTheme} from '../../../global/Theme';

import Text from '../../UI/Text';

const CustomMainHeader = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={lightTheme.THEME} barStyle="dark-content" />
      <View style={styles.headerLeft} />
      <View style={styles.headerCenter}>
        {/* Todo: replace text with logo */}
        <Text style={globalStyles.accentHeading}>OfficePay</Text>
      </View>
      <View style={styles.headerRight}>
        <Icon
          name={'logout'}
          type={'material'}
          color={lightTheme.PRIMARY_TEXT}
          size={30}
        />
      </View>
    </View>
  );
};

export default CustomMainHeader;

const styles = StyleSheet.create({
  container: {
      width: '100%',
    paddingVertical: 20,
    paddingTop: 50,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    backgroundColor: lightTheme.THEME
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
    backgroundColor: 'green',
  },
});
