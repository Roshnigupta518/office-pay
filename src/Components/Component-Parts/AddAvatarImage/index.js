import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';
import {getImageSrc} from '../../../global/utils/helperFunctions';

const AvatarImage = ({icon, src, onCameraClick}) => {
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        {icon ? (
          <Image style={styles.image} source={getImageSrc(src)} />
        ) : (
          <Icon
            type={'ionicon'}
            name={'md-person-outline'}
            size={80}
            color={lightTheme.PRIMARY_COLOR_LIGHT}
          />
        )}
      </View>
      <Pressable
        onPress={() => {
          if (onCameraClick) {
            onCameraClick();
          }
        }}
        style={styles.camera}>
        <Icon name={'camera'} type={'ionicon'} color={lightTheme.THEME} />
      </Pressable>
    </View>
  );
};

export default AvatarImage;

const styles = StyleSheet.create({
  view: {
    marginBottom: 20,
    position: 'relative',
  },
  container: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: lightTheme.PRIMARY_COLOR_LIGHT,
    borderWidth: 5,
    padding: 10,
    backgroundColor: '#efefefef',
    overflow: 'hidden',
    alignSelf: 'center',
    ...globalStyles.placeCenter,
  },
  camera: {
    backgroundColor: lightTheme.PRIMARY_COLOR,
    width: 40,
    height: 40,
    borderRadius: 30,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 10,
    ...globalStyles.placeCenter,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
