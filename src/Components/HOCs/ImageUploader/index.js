import React, {useState} from 'react';
import {Platform} from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import {prettyPrint} from '../../../global/utils/helperFunctions';

const WithImageUpload = (WrappedComp, uploadImageToServer, avatarSrc) => {
  return props => {
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(avatarSrc);

    const onTakePhotoClick = () => {
      setLoading(true);
      checkCameraPermission();
    };

    const checkCameraPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          request(PERMISSIONS.IOS.CAMERA).then(result => {
            if (result === 'granted') {
              handleTakePhoto();
            }
          });
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
            checkWriteToExternalPermission();
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
          console.log('You can write to storage');
          if ((key = 'camera')) {
            handleTakePhoto();
            return;
          }
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const handleTakePhoto = (storagePermission = true) => {
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

    const handleImageUpload = () => {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          return;
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          return;
        } else {
          uploadImageToServer(response);

          const source = {uri: 'file:///' + response.path};

          setAvatar(source);
          changeAvatar('file:///' + response.path);
        }
      });
    };

    return (
      <WrappedComponent {...props} handleImageUpload={handleImageUpload} />
    );
  };
};

export default WithImageUpload;
