/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

import RootStack from './src/Navigation/Stack/rootStack/rootStack';
import {lightTheme} from './src/global/Theme';

const handlePushNotification = notification => {
  if (notification && notification.data && notification.data.url) {
    const item = {
      url: notification.data.url,
    };

    return item;
  }

  return null;
};

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const {access_token} = useSelector(state => state.auth);

  const authStackScreens = {
    init: 'init',
    lang: 'lang',
    intro: 'intro',
    login: 'login',
    signup: 'signup',
  };

  const MainStackScreens = {
    init: 'init',
    home: {
      screens: {
        dashboard: 'dashboard',
        'create-invoice': 'create-invoice',
      },
    },
    'building-details': 'building-details',
    'bank-details': 'bank-details',
    'my-property': 'my-property',
    'add-office': 'add-office',
    'property-details': 'property-details',
    'list-more': 'list-more',
  };

  console.info({access_token});

  const config = {
    screens: access_token ? MainStackScreens : authStackScreens,
  };

  const linking = {
    prefixes: ['goinvoicy://', 'https://app.goinvoicy.com'],
    config: config,
    async getInitialURL() {
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      console.log({url});

      if (url != null) {
        return url;
      }

      // Check if there is an initial firebase notification
      const message = await messaging().getInitialNotification();

      let notifData;

      if (message) {
        notifData = handlePushNotification(message);
      }

      console.log({
        path: notifData?.url,
        returnRep: notifData ? notifData.url : notifData,
      });

      // const notifData = await HandleNotification().catch(err =>
      //   console.log({
      //     msg: 'error in HandleNotification',
      //     err,
      //   }),
      // );

      // Get deep link from data
      // if this is undefined, the app will open the default/home page
      return notifData ? notifData.url : notifData;
    },

    subscribe(listener) {
      const onReceiveURL = ({url}) => listener(url);

      // Listen to incoming links from deep linking
      const listner = Linking.addEventListener('url', onReceiveURL);

      // Listen to firebase push notifications
      const unsubscribeNotification = messaging().onNotificationOpenedApp(
        message => {
          const url = message?.data?.url;

          if (url) {
            // Any custom logic to check whether the URL needs to be handled

            console.log({subscribe: url});

            // Call the listener to let React Navigation handle the URL
            listener(url);
          }
        },
      );

      return () => {
        // Clean up the event listeners
        listner.remove();
        unsubscribeNotification();
      };
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      }>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
