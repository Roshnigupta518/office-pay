import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';

import {styles} from './styles';
import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';

const ResetPwd = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [securePwd, setSecurePwd] = useState(true);
  const [pwdErr, setPwdErr] = useState('');

  const [confirm, setConfirm] = useState('');
  const [confirmErr, setConfirmErr] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    // Todo: handle API call to reset pwd

    // move back to login screen after successfull api request
    navigation.navigate('login');
  };

  return (
    <>
      <AuthBgImage />
      <ScrollView contentContainerStyle={styles.cont}>
        <AuthPageTitle
          title={'Reset your Password'}
          desc={'Please enter your new password and Keep Manage your Invocies.'}
        />
        <View style={styles.inputCont}>
          <Input
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            inputStyle={globalStyles.fontDefault}
            secureTextEntry={securePwd}
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
              <Pressable onPress={() => setSecurePwd(!securePwd)}>
                {securePwd ? (
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
          <Input
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            inputStyle={globalStyles.fontDefault}
            secureTextEntry={secureConfirm}
            disabled={loading}
            errorMessage={confirmErr}
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
              <Pressable onPress={() => setSecureConfirm(!secureConfirm)}>
                {secureConfirm ? (
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
        </View>

        <View style={styles.btnCont}>
          <Button
            titleStyle={styles.savePwdBtnTitle}
            onPress={handleSave}
            title={'Save Password'}
            loading={loading}
            loadingProps={{size: 'large'}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ResetPwd;
