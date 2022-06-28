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
import { useTranslation } from 'react-i18next';

const ResetPwd = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [securePwd, setSecurePwd] = useState(true);
  const [pwdErr, setPwdErr] = useState('');

  const [confirm, setConfirm] = useState('');
  const [confirmErr, setConfirmErr] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);

  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

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
          title={t('reset_password_title')}
          desc={t('reset_password_desc')}
        />
        <View style={styles.inputCont}>
          <Input
            placeholder={t('reset_password_enter_pwd')}
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
            placeholder={t('reset_password_confirm_pwd')}
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
            title={t('reset_password_btn')}
            loading={loading}
            loadingProps={{size: 'large'}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ResetPwd;
