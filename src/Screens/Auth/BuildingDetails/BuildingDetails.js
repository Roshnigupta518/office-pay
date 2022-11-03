import React, {useState, useEffect} from 'react';
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
import {addBuilding, getBuildings} from '../../../API/Building';
import {addBuidlingDetails} from '../../../store/actions/BuildingActions';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import Picker from '../../../Components/UI/Picker';
import {rest} from 'lodash';

const INITIAL_STATE = {
  name: '',
  address: '',
  email: '',
  gst: '',
  contact: '',
  pan: '',
  city: '',
  buildingId: '',
  officeNumber: '',
  floorNumber: '',
  officeOwnerName: '',
};

const BuildingDetailsForm = ({
  loading,
  pushNextScreen,
  buildingOwner,
  token,
}) => {
  const [buildingDetails, setBuildingDetails] = useState(INITIAL_STATE);
  const [buildings, setBuildings] = useState([]);
  const [buildingDetailsErr, setBuildingDetailsErr] = useState(INITIAL_STATE);

  useEffect(() => {
    (async () => {
      setBuildings(null);
      const data = await getBuildings(token).catch(err => {
        console.log({err});
        setBuildings([]);
      });
      var result = data.map(({building_name: label, id: val, ...rest}) => ({
        label,
        val,
        ...rest,
      }));
      setBuildings(result);
    })();
  }, []);

  const validateFields = () => {
    let result = true;

    const nameError = ValueEmpty(buildingDetails.name);
    const addressError = ValueEmpty(buildingDetails.address);
    const gstError = ValueEmpty(buildingDetails.gst);
    const emailError = ValidateMail(buildingDetails.email);
    const mobileError = ValidateMobile(buildingDetails.contact);
    const panError = ValueEmpty(buildingDetails.pan);
    const cityError = ValueEmpty(buildingDetails.city);

    const buildingIdError = ValueEmpty(buildingDetails.buildingId);
    const officeError = ValueEmpty(buildingDetails.officeNumber);
    const floorError = ValueEmpty(buildingDetails.floorNumber);
    const ownerError = ValueEmpty(buildingDetails.officeOwnerName);

    console.log({
      nameError,
      addressError,
      gstError,
      emailError,
      mobileError,
      panError,
      cityError,
      buildingIdError,
      officeError,
      floorError,
      ownerError,
    });

    let errorObj = {
      ...buildingDetailsErr,
    };

    if (!buildingOwner) {
      if (officeError) {
        result = false;
        errorObj['officeNumber'] = '*Required';
      } else {
        errorObj['officeNumber'] = '';
      }

      if (floorError) {
        result = false;
        errorObj['floorNumber'] = '*Required';
      } else {
        errorObj['floorNumber'] = '';
      }

      if (ownerError) {
        result = false;
        errorObj['officeOwnerName'] = '*Required';
      } else {
        errorObj['officeOwnerName'] = '';
      }
    }

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
    // setBuildingDetails(INITIAL_STATE);
    setBuildingDetailsErr(INITIAL_STATE);
  };

  return (
    <View>
      {!buildingOwner && (
        <View>
          <View style={styles.pickersty}>
            <Picker
              containerStyle={styles.pickerCont}
              selectedValue={buildingDetails.buildingId}
              onValueChange={itemValue => {
                console.log({itemValue});
                handleOnChange('buildingId', itemValue);
              }}
              pickerData={buildings}
            />
          </View>

          <Input
            value={buildingDetails.officeNumber}
            onChangeText={value => handleOnChange('officeNumber', value)}
            style={globalStyles.textDefault}
            errorMessage={buildingDetailsErr.officeNumber}
            placeholder={t('office_number')}
            disabled={loading}
          />

          <Input
            value={buildingDetails.floorNumber}
            onChangeText={value => handleOnChange('floorNumber', value)}
            style={globalStyles.textDefault}
            errorMessage={buildingDetailsErr.floorNumber}
            placeholder={t('floor_number')}
            disabled={loading}
          />

          <Input
            value={buildingDetails.officeOwnerName}
            onChangeText={value => handleOnChange('officeOwnerName', value)}
            style={globalStyles.textDefault}
            errorMessage={buildingDetailsErr.officeOwnerName}
            placeholder={t('office_owner_name')}
            disabled={loading}
          />
        </View>
      )}

      <Input
        value={buildingDetails.name}
        onChangeText={value => handleOnChange('name', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.name}
        placeholder={t(buildingOwner ? 'add_building_name' : 'add_office_name')}
        disabled={loading}
      />

      <Input
        value={buildingDetails.address}
        onChangeText={value => handleOnChange('address', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.address}
        placeholder={t('add_building_address')}
        disabled={loading}
      />
      <Input
        value={buildingDetails.email}
        onChangeText={value => handleOnChange('email', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.email}
        placeholder={t('add_building_email')}
        disabled={loading}
      />
      <Input
        value={buildingDetails.gst}
        onChangeText={value => handleOnChange('gst', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.gst}
        placeholder={t('add_building_gst')}
        disabled={loading}
      />
      <Input
        value={buildingDetails.contact}
        onChangeText={value => handleOnChange('contact', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.contact}
        placeholder={t('add_building_contact')}
        disabled={loading}
      />
      <Input
        value={buildingDetails.city}
        onChangeText={value => handleOnChange('city', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.city}
        placeholder={t('add_building_city')}
        disabled={loading}
      />
      <Input
        value={buildingDetails.pan}
        onChangeText={value => handleOnChange('pan', value)}
        style={globalStyles.textDefault}
        errorMessage={buildingDetailsErr.pan}
        placeholder={t('add_building_pan')}
        disabled={loading}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={onNextPress}
        title={t('add_building_next_btn')}
        loading={loading}
        loadingProps={{size: 'large'}}
      />
    </View>
  );
};

const UploadPANimageSection = ({setImage}) => {
  const {t} = useTranslation();

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
          {t('add_building_pan_image')}
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
  token,
  doAddBuilding,
}) => {
  const [officeImage, setOfficeImage] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [addBuildingErr, setAddBuildingErr] = useState(false);
  const [addBuildingErrText, setAddBuildingErrText] = useState('');

  const fromDash = getObjPropertyValue(route.params, 'fromDash');

  const {t} = useTranslation();

  const handleNextPress = async buildingDetails => {
    console.log('INFO: initializing add building details...');
    setLoading(true);

    let error = false;

    const requestData = new FormData();

    requestData.append('city', buildingDetails.city);
    requestData.append('gst_number', buildingDetails.gst);
    if (panImage) requestData.append('pan_card_image', panImage);

    if (buildingOwner) {
      if (officeImage) requestData.append('building_image', officeImage);
      requestData.append('user_id', userID);
      requestData.append('email_id', buildingDetails.email);
      requestData.append('phone_number', buildingDetails.contact);
      requestData.append('pan_card', buildingDetails.pan);
      requestData.append('address', buildingDetails.address);
      requestData.append('building_name', buildingDetails.name);
    }else{
      requestData.append('email_address', buildingDetails.email);
      requestData.append('building_id', buildingDetails.buildingId);
      requestData.append('office_number', buildingDetails.officeNumber);
      requestData.append('floor_number', buildingDetails.floorNumber);
      requestData.append('office_owner_name', buildingDetails.officeOwnerName);
      requestData.append('contact_number', buildingDetails.contact);
      requestData.append('pan_number', buildingDetails.pan);
      requestData.append('office_address', buildingDetails.address);
      requestData.append('office_name', buildingDetails.name);
      if (officeImage) requestData.append('office_image', officeImage);
    }

    if (officeImage) {
      if (panImage) {
        await doAddBuilding(requestData, token, buildingOwner).catch(err => {
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
          console.log('added building');

          navigation.navigate('bank-details', {
            fromDash,
          });
        }
      } else {
        setLoading(false);
        alert('Please add Pancard image');
      }
    } else {
      setLoading(false);
      alert('Please add office image');
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
                <Text>{t('Skip')}</Text>
              </Pressable>
              <View style={styles.headerMid}>
                <Text>{t('step_1')}</Text>
              </View>
              <View style={styles.headerRight} />
            </View>
            <View style={styles.pageTitle}>
              <Text style={globalStyles.heading}>
                {t(`add_${buildingOwner ? 'building' : 'office'}_title`)}
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
          <Text style={globalStyles.heading}>
            {t(`add_${buildingOwner ? 'building' : 'office'}_avatar`)}
          </Text>
        </View>
        <BuildingDetailsForm
          loading={loading}
          pushNextScreen={handleNextPress}
          buildingOwner={buildingOwner}
          token={token}
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
  const {buildingOwner, userID, access_token} = state.auth;

  return {
    token: access_token,
    buildingOwner,
    userID,
  };
};

const mapDispatchToProps = dispatch => ({
  doAddBuilding: (data, token, buildingOwner) =>
    dispatch(addBuidlingDetails(data, token, buildingOwner)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails);
