import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';

import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';
import ErrorAlert from '../../../Components/UI/ErrorAlert';
import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import CheckBox from '../../../Components/UI/Checkbox';

import {styles} from './styles';

import {loginUser} from '../../../store/actions/AuthActions';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';
import {prettyPrint} from '../../../global/utils/helperFunctions';
import {ValidateMail, ValueEmpty} from '../../../global/utils/Validations';

const LoginForm = ({
  onSubmit,
  continueToProfileDetails,
  navigateToForgetPwd,
}) => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginErr, setLoginErr] = useState(false);
  const [loginErrText, setLoginErrText] = useState('');

  const [building, setBuilding] = useState(true);

  const validateLoginData = () => {
    let result = true;

    const emailResult = ValidateMail(email);
    const pwdEmpty = ValueEmpty(password);

    console.log({emailResult, pwdEmpty});

    if (emailResult !== 'success') {
      result = false;
      setEmailErr(emailResult);
    } else {
      setEmailErr('');
    }
    if (pwdEmpty) {
      result = false;
      setPwdErr('Plase fill your password');
    } else {
      setPwdErr('');
    }

    return result;
  };

  const handleLogin = async () => {
    if (!validateLoginData()) {
      return;
    }

    setLoading(true);

    let error = false;
    const role_id  = building ? 'Building' : 'Office'

    await onSubmit({email, password, role_id}).catch(err => {
      prettyPrint({
        msg: 'Error: in login user',
        err,
      });

      setLoginErrText(err);
      setLoginErr(true);

      error = true;
    });

    setLoading(false);
    if (!error) {
      continueToProfileDetails();
    }
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
        placeholder={t('login_placeholder_email')}
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
        placeholder={t('login_placeholder_pwd')}
        value={password}
        onChangeText={setPassword}
        inputStyle={globalStyles.fontDefault}
        secureTextEntry={secure}
        disabled={loading}
        errorMessage={pwdErr}
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
      <Pressable onPress={navigateToForgetPwd} style={styles.forgotPwdCont}>
        <Text style={styles.forgotPwd}>{t('login_forgot_pwd')}</Text>
      </Pressable>
      <View style={styles.loginBtnCont}>
        <Button
          titleStyle={styles.loginBtn}
          onPress={handleLogin}
          title={t('login_btn_title')}
          loading={loading}
          loadingProps={{size: 'large'}}
        />
      </View>
      <ErrorAlert
        alertProps={{
          showModal: loginErr,
          setShowModal: setLoginErr,
        }}
        errText={loginErrText}
      />
    </View>
  );
};

const Login = ({navigation, doUserLogin, buildingAdded}) => {
  const {t} = useTranslation();
  return (
    <>
      <AuthBgImage />
      <ScrollView style={styles.cont}>
        {/* <AuthPageTitle
          title={'Log In'}
          desc={'Please Sign In to your Account to Continue with App.'}
        /> */}
        <AuthPageTitle title={t('login_title')} desc={t('login_desc')} />
        <LoginForm
          onSubmit={doUserLogin}
          continueToProfileDetails={() => {
            // if a building is already added navigate to home then
            if (buildingAdded) {
              navigation.navigate('home');
              return;
            }
            navigation.navigate('building-details');
          }}
          navigateToForgetPwd={() => navigation.navigate('forget-pwd')}
        />
        <View style={styles.secondaryMsg}>
          <Text>{t('login_sign_up_alternate')}</Text>
          <View style={globalStyles.leftSeperator}>
            <Pressable
              onPress={() => {
                navigation.navigate('signup');
              }}>
              <Text style={globalStyles.anchor}>
                {t('login_sign_up_alternate_btn_title')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => {
  const {auth, buildingDetails} = state;

  return {
    auth,
    buildingAdded: Object.keys(buildingDetails).length,
  };
};

const mapDispatchToProps = dispatch => ({
  doUserLogin: data => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
