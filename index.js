/**
 * @format
 */

import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './src/Translations/i18n';

import App from './App';
import {name as appName} from './app.json';
import ErrorBoundary from './src/Components/ErrorBoundary';
import {persistor, store} from './src/store/ConfigStore';

LogBox.ignoreAllLogs(true);

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
