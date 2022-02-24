import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './TabScreens/Home/Home';
import AddOffice from './TabScreens/AddOffice/AddOffice';
import Search from './TabScreens/Search/Search';
import Notifications from './TabScreens/Notifications/Notifications';
import Messages from './TabScreens/Messages/Messages';

import {CustomTabBar} from '../../Components/UI/CustomBottomBar';

const Tab = createBottomTabNavigator();

const MyProperty = () => {
  return <Home />;

  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Add Office"
        component={AddOffice}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Notifications"
        component={Notifications}
      />
      <Tab.Screen
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //   },
        // }}
        name="Messages"
        component={Messages}
      />
    </Tab.Navigator>
  );
};

export default MyProperty;

const styles = StyleSheet.create({});
