import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CreateInvoice from '../../Screens/CreateInvoice/CreateInvoice';
import Dashboard from '../../Screens/Main/Dashboard/Dashboard';
import {CustomTabBar} from '../../Components/UI/CustomBottomBar';

const Tab = createBottomTabNavigator();

const RootTab = ({buildingOwner, ...props}) => {
  if (!buildingOwner) {
    return <Dashboard {...props} />;
  }

  const {t} = useTranslation();

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} t={t}  />}>
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
