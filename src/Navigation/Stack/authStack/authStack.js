import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../../Screens/Auth/Login/Login';
import SignUp from '../../../Screens/Auth/SignUp/SignUp';
import BuildingDetails from '../../../Screens/Auth/BuildingDetails/BuildingDetails';
import BankDetails from '../../../Screens/Auth/BankDetails/BankDetails';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
    </Stack.Navigator>
  );
};

export default AuthStack;
