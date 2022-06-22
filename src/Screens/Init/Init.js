import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import AuthBgImage from '../../Components/Component-Parts/AuthBGImage';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';
import {getShadowProperties} from '../../global/utils/helperFunctions';

const Init = ({navigation, auth, introComplete, buildingAdded}) => {
  const {userLogin, buildingOwner} = auth;

  const [route, setRoute] = useState('');

  const {i18n} = useTranslation();

  const performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  useEffect(() => {
    const syncAppLang = async () => {
      let lang = await AsyncStorage.getItem('goInvoicy-selectedLang');

      i18n.changeLanguage(lang).then(() => {
        console.log(`Language synced - ${lang}`);
      });
    };

    syncAppLang();
  }, []);

  useEffect(() => {
    (async () => {
      await performTimeConsumingTask();

      console.log({route, introComplete, userLogin, buildingAdded});

      if (route === '') {
        let setupRoute = '';
        if (userLogin) {
          console.log('INFO: user already logged in, moving to Dashboard');

          setupRoute =
            buildingAdded || !buildingOwner ? 'home' : 'building-details';
        } else if (!introComplete) {
          console.log(
            "INFO: user haven't walkeded through yet, pushing intro screens",
          );

          setupRoute = 'lang';
        } else {
          console.log('INFO: user is not logged in, moving to login page');

          setupRoute = 'login';
        }
        setRoute(setupRoute);
      } else {
        navigation.replace(route);
      }
    })();
  }, [route]);

  return (
    <View style={styles.view}>
      <AuthBgImage />
      <View style={styles.contain}>
        <Image
          style={{resizeMode: 'contain', width: 180, height: 200}}
          source={require('../../assets/images/imgpsh_fullsize_anim1.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },
  loadingCont: {
    width: 100,
    height: 100,
    backgroundColor: lightTheme.THEME,
    borderRadius: 75,
    ...getShadowProperties(7),
    ...globalStyles.placeCenter,
  },
  contain: {
    marginTop: Dimensions.get('window').height * 0.25,
    alignItems: 'center',
    flex: 1,
  },
});

const mapStateToProps = state => {
  const {auth, introComplete, buildingDetails} = state;

  return {
    auth,
    introComplete,
    buildingAdded: Object.keys(buildingDetails).length,
  };
};

export default connect(mapStateToProps)(Init);
