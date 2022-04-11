import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CreateInvoice from '../../Screens/CreateInvoice/CreateInvoice';
import Dashboard from '../../Screens/Main/Dashboard/Dashboard';
import {CustomTabBar} from '../../Components/UI/CustomBottomBar';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();

const RootTab = ({buildingOwner, ...props}) => {
  if (!buildingOwner) {
    return <Dashboard {...props} />;
  }

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

const mapStateToProps = state => {
  const {buildingOwner} = state.auth;

  return {
    buildingOwner,
  };
};

export default connect(mapStateToProps)(RootTab);
