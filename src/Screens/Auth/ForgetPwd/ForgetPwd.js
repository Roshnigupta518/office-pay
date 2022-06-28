import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements';
import { useTranslation } from 'react-i18next';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';
import Button from '../../../Components/UI/Button';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';

import {styles} from './styles';
import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';

const ForgetPwd = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

  const handleSend = () => {
    // Todo: handle API call to send email to server

    // continue to reset screen after successful API request
    navigation.navigate('reset-pwd');
  };

  return (
    <>
      <AuthBgImage />
      <ScrollView contentContainerStyle={styles.cont}>
        <AuthPageTitle
          title={t('forgot_password_title')}
          desc={t('forgot_password_desc')}
        />
        <View style={styles.inputCont}>
          <Input
            inputStyle={styles.input}
            containerStyle={styles.inputBaseContainer}
            placeholder="username@mail.com"
            value={email}
            onChangeText={setEmail}
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
        </View>
        <View style={styles.btnCont}>
          <Button
            titleStyle={styles.sendLinkBtnTitle}
            onPress={handleSend}
            title={t('forgot_password_btn_title')}
            loading={loading}
            loadingProps={{size: 'large'}}
          />
        </View>
        <View style={styles.secondaryMsg}>
          <Icon
            name="arrow-left"
            type={'feather'}
            color={lightTheme.SECONDARY_TEXT}
            size={20}
            style={styles.arrowIcon}
          />
          <Text>{t('forgot_password_back')}</Text>
          <View style={globalStyles.leftSeperator}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[globalStyles.anchor, styles.anchor]}>
                {t('forgot_password_login')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgetPwd;
