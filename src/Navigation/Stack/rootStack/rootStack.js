import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

import Intro from '../../../Screens/Intro/Intro';
import Login from '../../../Screens/Auth/Login/Login';
import SignUp from '../../../Screens/Auth/SignUp/SignUp';
import BuildingDetails from '../../../Screens/Auth/BuildingDetails/BuildingDetails';
import BankDetails from '../../../Screens/Auth/BankDetails/BankDetails';
// import Dashboard from '../../../Screens/Main/Dashboard/Dashboard';
import MyProperty from '../../../Screens/MyProperty/MyProperty';
import AddOffice from '../../../Screens/AddOffice/AddOffice';
import PropertyDetails from '../../../Screens/PropertyDetails';
import CreateInvoice from '../../../Screens/CreateInvoice/CreateInvoice';
import SelectLanguage from '../../../Screens/SelectLanguage/SelectLanguage';
import RootTab from '../../Tabs/rootTab';
import Init from '../../../Screens/Init/Init';
import ListMore from '../../../Screens/ListMore/ListMore';

const Stack = createNativeStackNavigator();

const RootStack = ({access_token}) => {
  // console.log({rootStack: access_token});

  return (
    <Stack.Navigator>
      {!access_token ? (
        <>
          <Stack.Screen
            name="init"
            options={{
              headerShown: false,
            }}
            component={Init}
          />
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
        </>
      ) : (
        <>
          <Stack.Screen
            name="init"
            options={{
              headerShown: false,
            }}
            component={Init}
          />
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
            }}
            component={RootTab}
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
          <Stack.Screen
            name="list-more"
            options={{
              headerShown: false,
            }}
            component={ListMore}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  const {userID, access_token} = state.auth;

  return {
    userID,
    access_token,
  };
};

export default connect(mapStateToProps, null)(RootStack);
