import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {Icon} from 'react-native-elements';

import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';

import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';

const LoginForm = () => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.form}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputStyle={globalStyles.fontDefault}
        leftIcon={
          <Icon
            name="mail"
            type={'entypo'}
            color={lightTheme.PRIMARY_COLOR}
            size={25}
            style={styles.icon}
          />
        }
      />
      <Input
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        inputStyle={globalStyles.fontDefault}
        secureTextEntry={secure}
        leftIcon={
          <Icon
            name="locked"
            type={'fontisto'}
            color={lightTheme.PRIMARY_COLOR}
            size={25}
            style={[styles.icon, styles.lockIcon]}
          />
        }
        rightIcon={
          <Pressable onPress={() => setSecure(!secure)}>
            {secure ? (
              <Icon
                name="eye"
                type={'entypo'}
                color={lightTheme.PRIMARY_TEXT}
                size={25}
                style={[styles.icon, styles.lockIcon]}
              />
            ) : (
              <Icon
                name="eye-with-line"
                type={'entypo'}
                color={lightTheme.PRIMARY_TEXT}
                size={25}
                style={[styles.icon, styles.lockIcon]}
              />
            )}
          </Pressable>
        }
      />
      <View style={styles.forgotPwdCont}>
        <Text style={styles.forgotPwd}>Forgot Password?</Text>
      </View>
      <View style={styles.loginBtnCont}>
        <Button
          titleStyle={styles.loginBtn}
          onPress={() => console.log('Todo: Handle login')}
          title={'Login'}
        />
      </View>
    </View>
  );
};

const Login = ({navigation}) => {
  return (
    <>
      <AuthBgImage />
      <ScrollView style={styles.cont}>
        <AuthPageTitle
          title={'Log In'}
          desc={'Please Sign In to your Account to Continue with App.'}
        />
        <LoginForm />
        <View style={styles.secondaryMsg}>
          <Text>Don’t have an account?</Text>
          <View style={globalStyles.leftSeperator}>
            <Pressable
              onPress={() => {
                navigation.navigate('signup');
              }}>
              <Text style={globalStyles.anchor}>SIGN UP</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
