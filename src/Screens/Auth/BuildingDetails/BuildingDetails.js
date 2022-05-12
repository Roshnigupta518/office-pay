import React, {useState} from 'react';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import AvatarImage from '../../../Components/Component-Parts/AddAvatarImage';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';
import ErrorAlert from '../../../Components/UI/ErrorAlert';
import WithImageUpload from '../../../Components/HOCs/ImageUploader';
import CustomStackHeader from '../../../Components/Component-Parts/CustomStackHeader';

import {styles} from './styles';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';
import {
  ValidateMail,
  ValidateMobile,
  ValueEmpty,
} from '../../../global/utils/Validations';
import {
  getObjPropertyValue,
  getPickerImageResp,
  prettyPrint,
} from '../../../global/utils/helperFunctions';
import {addBuilding} from '../../../API/Building';
import {addBuidlingDetails} from '../../../store/actions/BuildingActions';

const INITIAL_STATE = {
  name: '',
  address: '',
  email: '',
  gst: '',
  contact: '',
  pan: '',
  city: '',
};

const BuildingDetailsForm = ({loading, pushNextScreen}) => {
  const [buildingDetails, setBuildingDetails] = useState(INITIAL_STATE);

  const [buildingDetailsErr, setBuildingDetailsErr] = useState(INITIAL_STATE);

  const validateFields = () => {
    let result = true;

    const nameError = ValueEmpty(buildingDetails.name);
    const addressError = ValueEmpty(buildingDetails.address);
    const gstError = ValueEmpty(buildingDetails.gst);
    const emailError = ValidateMail(buildingDetails.email);
    const mobileError = ValidateMobile(buildingDetails.contact);
    const panError = ValueEmpty(buildingDetails.pan);
    const cityError = ValueEmpty(buildingDetails.city);

    console.log({
      nameError,
      addressError,
      gstError,
      emailError,
      mobileError,
      panError,
      cityError,
    });

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

    if (panError) {
      result = false;

      errorObj['pan'] = '*Required';
    } else {
      errorObj['pan'] = '';
    }

    if (cityError) {
      result = false;

      errorObj['city'] = '*Required';
    } else {
      errorObj['city'] = '';
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
    setBuildingDetails(INITIAL_STATE);
    setBuildingDetailsErr(INITIAL_STATE);
  };

  return (
    <View>
      <Input
        value={buildingDetails.name}
        onChangeText={value => handleOnChange('name', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.name}
        placeholder={'Building Name'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.address}
        onChangeText={value => handleOnChange('address', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.address}
        placeholder={'Address'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.email}
        onChangeText={value => handleOnChange('email', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.email}
        placeholder={'Email Id'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.gst}
        onChangeText={value => handleOnChange('gst', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.gst}
        placeholder={'GST number'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.contact}
        onChangeText={value => handleOnChange('contact', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.contact}
        placeholder={'Contact Number'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.city}
        onChangeText={value => handleOnChange('city', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.city}
        placeholder={'City'}
        disabled={loading}
      />
      <Input
        value={buildingDetails.pan}
        onChangeText={value => handleOnChange('pan', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.pan}
        placeholder={'Enter your PAN Card number'}
        disabled={loading}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={onNextPress}
        title={'Next'}
        loading={loading}
        loadingProps={{size: 'large'}}
      />
    </View>
  );
};

const UploadPANimageSection = ({setImage}) => {
  const uploadPANToServer = res => {
    console.log('handle PAN upload to server');

    const imageResp = getPickerImageResp(res);

    prettyPrint({imageResp});
    setImage(imageResp);
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

const BuildingDetails = ({
  navigation,
  buildingOwner,
  route,
  userID,
  doAddBuilding,
}) => {
  const [officeImage, setOfficeImage] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [addBuildingErr, setAddBuildingErr] = useState(false);
  const [addBuildingErrText, setAddBuildingErrText] = useState('');

  const fromDash = getObjPropertyValue(route.params, 'fromDash');

  const handleNextPress = async buildingDetails => {
    console.log('INFO: initializing add building details...');
    setLoading(true);

    let error = false;

    const requestOptions = {
      user_id: userID,
      email_id: buildingDetails.email,
      phone_number: buildingDetails.contact,
      pan_card: buildingDetails.pan,
      address: buildingDetails.address,
      city: buildingDetails.city,
      building_name: buildingDetails.name,
      building_image: officeImage,
      pan_card_image: panImage,
    };

    await doAddBuilding(requestOptions).catch(err => {
      prettyPrint({
        msg: 'Error: in add building details',
        err,
      });

      setAddBuildingErrText(err);
      setAddBuildingErr(true);

      error = true;
    });

    setLoading(false);
    if (!error) {
      console.log("added building");

      navigation.navigate('bank-details', {
        fromDash,
      });
    }
  };

  const uploadProfileToServer = res => {
    console.log('handle image upload to server');

    const imageResp = getPickerImageResp(res);

    prettyPrint({imageResp});
    setOfficeImage(imageResp);
  };

  const goToDashboard = () => {
    navigation.navigate('home');
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
              <Pressable style={styles.headerLeft} onPress={goToDashboard}>
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
            src={getObjPropertyValue(officeImage, 'uri')}
            setAvatar={img => setOfficeImage(img)}
          />
          <Text style={globalStyles.heading}>{`Add ${
            buildingOwner ? 'Building' : 'Office'
          } Image`}</Text>
        </View>
        <BuildingDetailsForm
          loading={loading}
          pushNextScreen={handleNextPress}
        />
        <UploadPANimageSection
          src={panImage}
          setImage={img => setPanImage(img)}
        />
      </ScrollView>
      <ErrorAlert
        alertProps={{
          showModal: addBuildingErr,
          setShowModal: setAddBuildingErr,
        }}
        errText={addBuildingErrText}
      />
    </View>
  );
};

const mapStateToProps = state => {
  const {buildingOwner, userID} = state.auth;

  return {
    buildingOwner,
    userID,
  };
};

const mapDispatchToProps = dispatch => ({
  doAddBuilding: data => dispatch(addBuidlingDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
