import React, {useState} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {Icon, SocialIcon} from 'react-native-elements';

import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';

import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';
import CheckBox from '../../../Components/UI/Checkbox';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';

const SignUpForm = ({continueSignup}) => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [building, setBuilding] = useState(true);

  return (
    <View style={styles.form}>
      <View style={styles.radios}>
        <CheckBox
          title="Building"
          checked={building}
          checkedIcon={
            <Icon
              color={lightTheme.PRIMARY_COLOR}
              name={'radio-button-on'}
              type={'ionicon'}
              size={25}
            />
          }
          uncheckedIcon={
            <Icon
              color={lightTheme.SECONDARY_TEXT}
              name={'radio-button-off'}
              type={'ionicon'}
              size={25}
            />
          }
          style={styles.checkBox}
          onPress={() => setBuilding(true)}
        />
        <CheckBox
          title="Office"
          checkedIcon={
            <Icon
              color={lightTheme.PRIMARY_COLOR}
              name={'radio-button-on'}
              type={'ionicon'}
              size={25}
            />
          }
          uncheckedIcon={
            <Icon
              color={lightTheme.SECONDARY_TEXT}
              name={'radio-button-off'}
              type={'ionicon'}
              size={25}
            />
          }
          checked={!building}
          style={styles.checkBox}
          onPress={() => setBuilding(false)}
        />
      </View>
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
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
      />

      <View style={styles.signUpBtnCont}>
        <Button
          titleStyle={styles.signUpBtnTitle}
          onPress={() => {
            console.log('Todo: Handle Singup');
            continueSignup();
          }}
          title={'Sign Up'}
        />
      </View>
    </View>
  );
};

const RenderSocialSignUp = () => {
  return (
    <View style={styles.footerBg}>
      <View style={styles.footerRelativeCont}>
        <View style={styles.footer}>
          <View style={styles.footerTextCont}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>Or SignUp with</Text>
            <View style={styles.footerLine} />
          </View>
          <View style={styles.footerIconsCont}>
            <View style={styles.footerIconsContInner}>
              <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                type="google"
              />
              <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                type="facebook"
              />
              <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                type="linkedin"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const SignUp = ({navigation}) => {
  return (
    <View style={styles.view}>
      <AuthBgImage />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cont}>
          <AuthPageTitle
            title={'Sign Up'}
            desc={'Please Sign Up to your Account to Continue with App.'}
          />
          <SignUpForm
            continueSignup={() => {
              navigation.navigate('building-details');
            }}
          />
          <View style={styles.secondaryMsg}>
            <Text>Already have an account.</Text>
            <View style={globalStyles.leftSeperator}>
              <Pressable
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <Text style={globalStyles.anchor}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <RenderSocialSignUp />
      </ScrollView>
    </View>
  );
};

export default SignUp;
