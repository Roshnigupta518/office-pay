/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AuthStack from './src/Navigation/Stack/authStack/authStack';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
