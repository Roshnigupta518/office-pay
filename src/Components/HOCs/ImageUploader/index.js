import React, {useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';

import Text from '../../UI/Text';
import Button from '../../UI/Button';
import Alert from '../../UI/Alert';

import {globalStyles} from '../../../global/Styles';

import {prettyPrint} from '../../../global/utils/helperFunctions';

const WithImageUpload = (WrappedComponent, uploadImageToServer) => {
  return props => {
    const [showModal, setShowModal] = useState(false);

    const checkCameraPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          const result = await request(PERMISSIONS.IOS.CAMERA);

          if (result === 'granted') {
            handleTakePhoto();
          }
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Office Pay Camera Permission',
              message:
                'Office Pay needs access to your camera ' +
                'so you can change your profile picture.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            await checkWriteToExternalPermission();
          } else {
            console.log('Camera permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const checkWriteToExternalPermission = async (key = 'camera') => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Office Pay Storage Permission',
            message:
              'Office Pay needs to write to your storage ' +
              'to save your picture in Gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          console.log('Storage permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const handleTakePhoto = async (storagePermission = true) => {
      const permissionsGranted = await checkCameraPermission();

      console.log({permissionsGranted});

      const options = {
        mediaType: 'photo',
        saveToPhotos: storagePermission,
      };
      setLoading(false);

      launchCamera(options, res => {
        if (res.errorCode) {
          console.warn(res.errorCode);
          return;
        }
        prettyPrint(res);
        if (!res.didCancel) {
          uploadImageToServer(res);
        }
      });
    };

    const handleChooseFromGallery = () => {
      const options = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, res => {
        if (res.errorCode) {
          console.warn(res.errorCode);
          return;
        }
        prettyPrint(res);
        if (!res.didCancel) {
          uploadImageToServer(res);
        }
      });
    };

    return (
      <View>
        <WrappedComponent
          {...props}
          handleImageUpload={() => setShowModal(!showModal)}
        />
        <Alert showModal={showModal} setShowModal={setShowModal}>
          <Text style={styles.heading}>Upload Image</Text>
          <Button
            title={'Take a photo'}
            containerStyle={styles.btn}
            onPress={() => handleTakePhoto()}
          />
          <Button
            title={'Pick from Gallery'}
            containerStyle={styles.btn}
            onPress={() => handleChooseFromGallery()}
          />
        </Alert>
      </View>
    );
  };
};

export default WithImageUpload;

const styles = StyleSheet.create({
  heading: {
    ...globalStyles.heading,
  },
  btn: {
    marginTop: 20,
    width: '70%',
  },
});
