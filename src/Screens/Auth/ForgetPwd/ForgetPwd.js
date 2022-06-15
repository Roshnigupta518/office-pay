import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import AuthPageTitle from '../../../Components/Component-Parts/AuthPageTitle';
import Button from '../../../Components/UI/Button';
import Input from '../../../Components/UI/Input';

import {styles} from './styles';
import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';

const ForgetPwd = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading] = useState(false);

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
          title={'Forgot Password'}
          desc={
            'Please enter the email address you’d like your password reset information sent to'
          }
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
            title={'Send Link'}
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
          <Text>Back to</Text>
          <View style={globalStyles.leftSeperator}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[globalStyles.anchor, styles.anchor]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgetPwd;
