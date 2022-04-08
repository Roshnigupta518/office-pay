import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CreateInvoice from '../../Screens/CreateInvoice/CreateInvoice';
import Dashboard from '../../Screens/Main/Dashboard/Dashboard';
import {CustomTabBar} from '../../Components/UI/CustomBottomBar';

const Tab = createBottomTabNavigator();

export const RootTab = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="create-invoice"
        component={CreateInvoice}
      />
    </Tab.Navigator>
  );
};
