import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';

const DefaultButton = ({...props}) => {
  return (
    <Button
      buttonStyle={[styles.btn]}
      titleProps={{enableFontScaling: false}}
      titleStyle={styles.btnTitleStyle}
      containerStyle={styles.btnCont}
      {...props}
    />
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  btnCont: {
    width: '100%',
  },
  btn: {
    backgroundColor: lightTheme.PRIMARY_COLOR,
    borderRadius: 10,
  },
  btnTitleStyle: {
    ...globalStyles.fontDefault,
  },
});
