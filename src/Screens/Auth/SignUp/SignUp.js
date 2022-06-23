import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {Icon, SocialIcon} from 'react-native-elements';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';
import CheckBox from '../../../Components/UI/Checkbox';
import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';

import {signUp} from '../../../API/Auth';

import {
  ValidateMail,
  ValidatePassword,
} from '../../../global/utils/Validations';

import {GOOGLE_WEB_CLIENT_ID} from '../../../assets/Constants';
import {prettyPrint} from '../../../global/utils/helperFunctions';
import { useTranslation } from 'react-i18next';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const handleSignUpWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error) {
    prettyPrint({error});
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
      console.log('Error: some other error happend in google sign-up');
    }
  }
};

const SignUpForm = ({continueSignup}) => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const [building, setBuilding] = useState(true);

  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

  const validateRegisterData = () => {
    let result = true;

    const emailResult = ValidateMail(email);
    const pwdNotMatched = password !== confirmPassword;

    console.log({emailResult, pwdNotMatched});

    if (emailResult !== 'success') {
      result = false;
      setEmailErr(emailResult);
    } else {
      setEmailErr('');
    }
    if (pwdNotMatched) {
      result = false;
      setConfirmPasswordErr('Passwords do not match');
    } else {
      setConfirmPasswordErr('');
    }

    return result;
  };

  const handleSignUp = async () => {
    if (!validateRegisterData()) {
      return;
    }

    setLoading(true);

    const registerData = {
      // ! ==========
      // name: required in API req but there's no name field
      // ! ==========

      email,
      password,
      password_confirmation: confirmPassword,
      role_id: building ? 1 : 0, // * assuming 1 is for building...do confirm
    };

    let error = false;

    await signUp(registerData).catch(err => {
      // Todo: show error to user
      prettyPrint({
        msg: 'Error: in registering user',
        err,
      });
      error = true;
    });

    setLoading(false);

    if (!error) {
      continueSignup();
    }
  };

  const handlePwdChange = pwd => {
    const pwdResult = ValidatePassword(password);

    if (pwdResult !== 'success') {
      setPasswordErr(pwdResult);
    } else {
      setPasswordErr('');
    }

    setPassword(pwd);
  };

  return (
    <View style={styles.form}>
      <View style={styles.radios}>
        <CheckBox
          title={t('signup_Building')}
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
          title={t('signup_Office')}
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
        placeholder={t("signup_placeholder_email")}
        value={email}
        onChangeText={setEmail}
        inputStyle={globalStyles.fontDefault}
        disabled={loading}
        errorMessage={emailErr}
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
        placeholder={t("signup_placeholder_pwd")}
        value={password}
        onChangeText={handlePwdChange}
        inputStyle={globalStyles.fontDefault}
        secureTextEntry={secure}
        disabled={loading}
        errorMessage={passwordErr}
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
        placeholder={t("signup_placeholder_confirm_pwd")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        inputStyle={globalStyles.fontDefault}
        secureTextEntry={secure}
        errorMessage={confirmPasswordErr}
        disabled={loading}
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
            handleSignUp();
          }}
          loading={loading}
          loadingProps={{size: 'large'}}
          title={t("signup_btn_title")}
        />
      </View>
    </View>
  );
};

const RenderSocialSignUp = () => {
  const {t} = useTranslation();
  
  const onGoogleButtonPress = async () => {
    const googleUserInfo = await handleSignUpWithGoogle();

    prettyPrint({googleUserInfo});
  };

  return (
    <View style={styles.footerBg}>
      <View style={styles.footerRelativeCont}>
        <View style={styles.footer}>
          <View style={styles.footerTextCont}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>{t('signup_sign_up_alternate')}</Text>
            <View style={styles.footerLine} />
          </View>
          <View style={styles.footerIconsContInner}>
              <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                button
                type="google"
                title={t('signup_sign_up_alternate_btn_title')}
                onPress={onGoogleButtonPress}
              />
              {/* <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                type="facebook"
              />
              <SocialIcon
                underlayColor={lightTheme.PRIMARY_COLOR}
                raised
                type="linkedin"
              /> */}
            </View>
        </View>
      </View>
    </View>
  );
};

const SignUp = ({navigation}) => {

  const {t} = useTranslation();

  return (
    <View style={styles.view}>
      <AuthBgImage />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cont}>
          <AuthPageTitle
            title={t("signup_title")}
            desc={t("signup_desc")}
          />
          <SignUpForm
            continueSignup={() => {
              navigation.navigate('login');
            }}
          />
          <View style={styles.secondaryMsg}>
            <Text>{t('signup_login_alternate')}</Text>
            <View style={globalStyles.leftSeperator}>
              <Pressable
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <Text style={globalStyles.anchor}>{t('signup_login_alternate_btn_title')}</Text>
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
