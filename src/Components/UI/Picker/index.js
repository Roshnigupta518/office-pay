import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {fonts} from '../../../global/fonts';
import {lightTheme} from '../../../global/Theme';

const DefaultPicker = ({pickerData, containerStyle,...props}) => {
  // console.log({pickerData});

  return (
    <View style={[styles.pickerCont, containerStyle]}>
      <Picker {...props}>
        {pickerData.map(ele => {
          return (
            <Picker.Item
              style={styles.itemStyle}
              label={ele.label}
              value={ele.val}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default DefaultPicker;

const styles = StyleSheet.create({
  pickerCont: {
    borderWidth: 1,
    borderColor: lightTheme.SECONDARY_TEXT,
    borderRadius: 3,
    marginBottom: 5,
  },
  itemStyle: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },
});
