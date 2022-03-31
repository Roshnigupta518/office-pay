import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from '../../../Screens/Intro/Intro';
import Login from '../../../Screens/Auth/Login/Login';
import SignUp from '../../../Screens/Auth/SignUp/SignUp';
import BuildingDetails from '../../../Screens/Auth/BuildingDetails/BuildingDetails';
import BankDetails from '../../../Screens/Auth/BankDetails/BankDetails';
import Dashboard from '../../../Screens/Main/Dashboard/Dashboard';
import MyProperty from '../../../Screens/MyProperty/MyProperty';
import AddOffice from '../../../Screens/AddOffice/AddOffice';
import PropertyDetails from '../../../Screens/PropertyDetails';
import CreateInvoice from '../../../Screens/CreateInvoice/CreateInvoice';
import SelectLanguage from '../../../Screens/SelectLanguage/SelectLanguage';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="lang"
        options={{
          headerShown: false,
        }}
        component={SelectLanguage}
      />
      <Stack.Screen
        name="intro"
        options={{
          headerShown: false,
        }}
        component={Intro}
      />
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
      <Stack.Screen
        name="property-details"
        options={{
          headerShown: false,
        }}
        component={PropertyDetails}
      />
      <Stack.Screen
        name="create-invoice"
        options={{
          headerShown: false,
        }}
        component={CreateInvoice}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
