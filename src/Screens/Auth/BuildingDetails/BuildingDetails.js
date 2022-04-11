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
import {connect} from 'react-redux';
import {
  ValidateMail,
  ValidateMobile,
  ValueEmpty,
} from '../../../global/utils/Validations';
import CustomStackHeader from '../../../Components/Component-Parts/CustomStackHeader';
import {getObjPropertyValue} from '../../../global/utils/helperFunctions';
import WithImageUpload from '../../../Components/HOCs/ImageUploader';

const INITIAL_STATE = {
  name: '',
  address: '',
  email: '',
  gst: '',
  contact: '',
};

const BuildingDetailsForm = ({pushNextScreen}) => {
  const [buildingDetails, setBuildingDetails] = useState(INITIAL_STATE);

  const [buildingDetailsErr, setBuildingDetailsErr] = useState(INITIAL_STATE);

  const validateFields = () => {
    let result = true;

    const nameError = ValueEmpty(buildingDetails.name);
    const addressError = ValueEmpty(buildingDetails.address);
    const gstError = ValueEmpty(buildingDetails.gst);
    const emailError = ValidateMail(buildingDetails.email);
    const mobileError = ValidateMobile(buildingDetails.contact);

    console.log({nameError, addressError, gstError, emailError, mobileError});

    let errorObj = {
      ...buildingDetailsErr,
    };

    if (nameError) {
      result = false;

      errorObj['name'] = '*Required';
    } else {
      errorObj['name'] = '';
    }

    if (addressError) {
      result = false;

      errorObj['address'] = '*Required';
    } else {
      errorObj['address'] = '';
    }

    if (gstError) {
      result = false;

      errorObj['gst'] = '*Required';
    } else {
      errorObj['gst'] = '';
    }

    if (emailError !== 'success') {
      result = false;

      errorObj['email'] = emailError;
    } else {
      errorObj['email'] = '';
    }

    if (mobileError !== 'success') {
      result = false;

      errorObj['contact'] = mobileError;
    } else {
      errorObj['contact'] = '';
    }

    if (result) {
      setBuildingDetailsErr(INITIAL_STATE);
    } else {
      setBuildingDetailsErr(errorObj);
    }

    return result;
  };

  const handleOnChange = (key, val) => {
    setBuildingDetails({
      ...buildingDetails,
      [key]: val,
    });
  };

  const onNextPress = () => {
    if (!validateFields()) {
      return;
    }

    pushNextScreen(buildingDetails);
  };

  return (
    <View>
      <Input
        value={buildingDetails.name}
        onChangeText={value => handleOnChange('name', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.name}
        placeholder={'Building Name'}
      />
      <Input
        value={buildingDetails.address}
        onChangeText={value => handleOnChange('address', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.address}
        placeholder={'Address'}
      />
      <Input
        value={buildingDetails.email}
        onChangeText={value => handleOnChange('email', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.email}
        placeholder={'Email Id'}
      />
      <Input
        value={buildingDetails.gst}
        onChangeText={value => handleOnChange('gst', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.gst}
        placeholder={'GST number'}
      />
      <Input
        value={buildingDetails.contact}
        onChangeText={value => handleOnChange('contact', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.contact}
        placeholder={'Contact Number'}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={onNextPress}
        title={'Next'}
      />
    </View>
  );
};

const UploadPANimageSection = () => {
  const uploadPANToServer = () => {
    console.log('handle PAN upload to server');
  };

  const PandCardUploaderWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <TouchableOpacity
        style={styles.uploadImageBtn}
        onPress={() => {
          console.log('Todo: Handle upload PAN image');
          handleImageUpload();
        }}>
        <Icon
          name={'image-plus'}
          type={'material-community'}
          color={lightTheme.PRIMARY_COLOR}
        />
        <Text style={styles.uploadImageBtnText}>
          Upload your PAN card Image
        </Text>
      </TouchableOpacity>
    ),
    uploadPANToServer,
    null,
  );

  return (
    <View style={styles.uploadImageBtnCont}>
      <PandCardUploaderWithPicker />
    </View>
  );
};

const BuildingDetails = ({navigation, buildingOwner, route}) => {
  const [officeImage, setOfficeImage] = useState(null);

  const {fromDash} = getObjPropertyValue(route.params, 'fromDash');

  console.log({fromDash});

  const uploadProfileToServer = () => {
    console.log('handle image upload to server');
  };

  const AvatarImageWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <AvatarImage onCameraClick={handleImageUpload} {...props} />
    ),
    uploadProfileToServer,
    null,
  );

  return (
    <View style={styles.view}>
      {fromDash ? (
        <CustomStackHeader goBack={() => navigation.goBack()} />
      ) : (
        <AuthBgImage />
      )}
      <ScrollView
        style={[styles.container, fromDash ? {} : styles.containerShifted]}>
        {!fromDash ? (
          <>
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
          </>
        ) : (
          <View style={styles.placeholderView} />
        )}

        <View style={styles.avatar}>
          <AvatarImageWithPicker
            src={officeImage}
            setAvatar={img => setOfficeImage(img)}
          />
          <Text style={globalStyles.heading}>{`Add ${
            buildingOwner ? 'Building' : 'Office'
          } Image`}</Text>
        </View>
        <BuildingDetailsForm
          pushNextScreen={buildingDetails => {
            navigation.navigate('bank-details', {buildingDetails, fromDash});
          }}
        />
        <UploadPANimageSection />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {buildingOwner} = state.auth;

  return {
    buildingOwner,
  };
};

export default connect(mapStateToProps)(BuildingDetails);
