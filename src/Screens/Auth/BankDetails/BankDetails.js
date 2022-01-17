import React, {useState} from 'react';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import AvatarImage from '../../../Components/Component-Parts/AddAvatarImage';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';

import {styles} from './styles';

import {globalStyles} from '../../../global/Styles';

const BankDetailsForm = () => {
  return (
    <View style={styles.detailsFormCont}>
      <Input
        style={globalStyles.textDefault}
        placeholder={'Account Holder Name'}
      />
      <Input
        style={globalStyles.textDefault}
        placeholder={'Enter your account number'}
      />
      <Input
        style={globalStyles.textDefault}
        placeholder={'Re-enter your account number'}
      />
      <Input style={globalStyles.textDefault} placeholder={'Enter IFSC Code'} />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={() => console.log('Todo: Handle Bank details next')}
        title={'Next'}
      />
    </View>
  );
};

const BankDetails = () => {
  return (
    <View style={styles.view}>
      <AuthBgImage />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => console.log('Todo: Handle Skip')}>
            <Text>Skip</Text>
          </Pressable>
          <View style={styles.headerMid}>
            <Text>2 to 2 Step</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.pageTitle}>
          <Text style={globalStyles.heading}>Add your Bank Detail</Text>
        </View>
        <BankDetailsForm />
      </ScrollView>
    </View>
  );
};

export default BankDetails;
