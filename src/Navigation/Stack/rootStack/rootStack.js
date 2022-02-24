import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../../Screens/Auth/Login/Login';
import SignUp from '../../../Screens/Auth/SignUp/SignUp';
import BuildingDetails from '../../../Screens/Auth/BuildingDetails/BuildingDetails';
import BankDetails from '../../../Screens/Auth/BankDetails/BankDetails';
import Dashboard from '../../../Screens/Main/Dashboard/Dashboard';
import MyProperty from '../../../Screens/MyProperty/TabScreens/Home/Home';
import AddOffice from '../../../Screens/MyProperty/TabScreens/AddOffice/AddOffice';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="building-details"
        options={{
          headerShown: false,
        }}
        component={BuildingDetails}
      />
      <Stack.Screen
        name="bank-details"
        options={{
          headerShown: false,
        }}
        component={BankDetails}
      />
      {/* Main */}
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
        component={Dashboard}
      />
      <Stack.Screen
        name="my-property"
        options={{
          headerShown: false,
        }}
        component={MyProperty}
      />
      <Stack.Screen
        name="add-office"
        options={{
          headerShown: false,
        }}
        component={AddOffice}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
