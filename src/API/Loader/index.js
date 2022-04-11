import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {globalStyles} from '../../global/Styles';

import {lightTheme} from '../../global/Theme';

const Loader = () => {
  return (
    <View style={styles.loadingCont}>
      <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingCont: {
    flex: 1,
    ...globalStyles.placeCenter,
  },
});
