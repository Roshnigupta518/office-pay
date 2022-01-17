import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';
import {getImageSrc} from '../../../global/utils/helperFunctions';

const AvatarImage = ({icon, src}) => {
  return (
    <View>
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
        onPress={() => console.log('TODO: handle camera click')}
        style={styles.camera}>
        <Icon name={'camera'} type={'ionicon'} color={lightTheme.THEME} />
      </Pressable>
    </View>
  );
};

export default AvatarImage;

const styles = StyleSheet.create({
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
    position: 'relative',
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
    right: '30%',
    ...globalStyles.placeCenter,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
