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
  const [buildingDetails, setBuildingDetails] = useState({
    name: '',
    address: '',
    email: '',
    gst: '',
    contact: '',
  });

  handleOnChange = (key, val) => {
    setBuildingDetails({
      ...buildingDetails,
      [key]: val,
    });
  };

  return (
    <View>
      <Input
        value={buildingDetails.name}
        onChangeText={value => handleOnChange('name', value)}
        style={globalStyles.textDefault}
        placeholder={'Building Name'}
      />
      <Input
        value={buildingDetails.address}
        onChangeText={value => handleOnChange('address', value)}
        style={globalStyles.textDefault}
        placeholder={'Address'}
      />
      <Input
        value={buildingDetails.email}
        onChangeText={value => handleOnChange('email', value)}
        style={globalStyles.textDefault}
        placeholder={'Email Id'}
      />
      <Input
        value={buildingDetails.gst}
        onChangeText={value => handleOnChange('gst', value)}
        style={globalStyles.textDefault}
        placeholder={'GST number'}
      />
      <Input
        value={buildingDetails.contact}
        onChangeText={value => handleOnChange('contact', value)}
        style={globalStyles.textDefault}
        placeholder={'Contact Number'}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={() => {
          pushNextScreen(buildingDetails);
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
          pushNextScreen={buildingDetails => {
            navigation.navigate('bank-details', {buildingDetails});
          }}
        />
        <UploadPANimageSection />
      </ScrollView>
    </View>
  );
};

export default BuildingDetails;
