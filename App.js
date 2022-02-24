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

import RootStack from './src/Navigation/Stack/rootStack/rootStack';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
