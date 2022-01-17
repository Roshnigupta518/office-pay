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
import {lightTheme} from '../../../global/Theme';

const BuildingDetailsForm = ({pushNextScreen}) => {
  return (
    <View>
      <Input style={globalStyles.textDefault} placeholder={'Building Name'} />
      <Input style={globalStyles.textDefault} placeholder={'Address'} />
      <Input style={globalStyles.textDefault} placeholder={'Email Id'} />
      <Input style={globalStyles.textDefault} placeholder={'GST number'} />
      <Input style={globalStyles.textDefault} placeholder={'Contact Number'} />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={() => {
          console.log('Todo: Handle office building next');
          pushNextScreen();
        }}
        title={'Next'}
      />
    </View>
  );
};

const UploadPANimageSection = () => {
  return (
    <View style={styles.uploadImageBtnCont}>
      <TouchableOpacity
        style={styles.uploadImageBtn}
        onPress={() => console.log('Todo: Handle upload PAN image')}>
        <Icon
          name={'image-plus'}
          type={'material-community'}
          color={lightTheme.PRIMARY_COLOR}
        />
        <Text style={styles.uploadImageBtnText}>
          Upload your PAN card Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BuildingDetails = ({navigation}) => {
  const [officeImage, setOfficeImage] = useState(null);

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
            <Text>1 to 2 Step</Text>
          </View>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.pageTitle}>
          <Text style={globalStyles.heading}>
            Complete your Building Details
          </Text>
        </View>
        <View style={styles.avatar}>
          <AvatarImage
            src={officeImage}
            setAvatar={img => setOfficeImage(img)}
          />
        </View>
        <BuildingDetailsForm
          pushNextScreen={() => {
            navigation.navigate('bank-details');
          }}
        />
        <UploadPANimageSection />
      </ScrollView>
    </View>
  );
};

export default BuildingDetails;
