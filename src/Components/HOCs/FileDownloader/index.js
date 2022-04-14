import React, { useState } from 'react';
import {Alert, PermissionsAndroid, StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import AppAlert from '../../UI/Alert';
import Text from '../../UI/Text';

import {globalStyles} from '../../../global/Styles';
import Button from '../../UI/Button';

const WithFileDownloader = WrappedComponent => {
  return props => {
    const [showModal, setShowModal] = useState(false);

    const checkWriteToExternalPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Office Pay Storage Permission',
            message:
              'Office Pay needs to write to your storage ' +
              'to save the downloaded invoice',
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

    const downloadFile = (url, filename) => {
      const {dirs} = RNFetchBlob.fs;

      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: filename,
          path: `${dirs.DownloadDir}/${filename}`,
        },
      })
        .fetch('GET', url)
        .then(res => {
          console.log('The file saved to ', res.path());
          setShowModal(true);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const handleDownload = async (url, filename) => {
      console.log('initializing download...');

      if (!url || typeof url !== 'string') {
        console.warn('download URL is invalid');
        return;
      }

      try {
        const permissionsGranted = await checkWriteToExternalPermission();

        console.log({permissionsGranted});

        if (permissionsGranted) {
          downloadFile(url, filename);
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return (
      <View>
        <WrappedComponent {...props} handleDownload={handleDownload} />
        <AppAlert showModal={showModal} setShowModal={setShowModal}>
          <Text style={globalStyles.heading}>File download successfully</Text>
          <Button
            title={'OK'}
            containerStyle={styles.btn}
            onPress={() => setShowModal(false)}
          />
        </AppAlert>
      </View>
    );
  };
};

export default WithFileDownloader;

const styles = StyleSheet.create({
  heading: {
    ...globalStyles.heading,
  },
  btn: {
    marginTop: 20,
    width: '70%',
  },
});
