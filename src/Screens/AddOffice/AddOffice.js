import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import Text from '../../Components/UI/Text';
import Input from '../../Components/UI/Input';
import Button from '../../Components/UI/Button';

import {globalStyles} from '../../global/Styles';
import {styles} from './styles';
import {checkForEmptyObjectProperties} from '../../global/utils/Validations';
import {addOffice} from '../../API/Offices';

const INITIAL_STATE = {
  wing: '',
  officeNumber: '',
  floorNumber: '',
  officeName: '',
  officeOwnerName: '',
  contact: '',
  email: '',
  gst: '',
  pan: '',
};

const RenderOfficeDetailsform = ({loading, handleAddOffice}) => {
  const [officeDetails, setOfficeDetails] = useState(INITIAL_STATE);
  const [officeDetailsError, setOfficeDetailsError] = useState(INITIAL_STATE);

  const handleChange = (key, val) => {
    setOfficeDetails({
      ...officeDetails,
      [key]: val,
    });
  };

  const validateFields = () => {
    let result = true;

    const emptyKeys = checkForEmptyObjectProperties(officeDetails);

    let errorObj = {
      ...INITIAL_STATE,
    };

    emptyKeys.map(key => {
      result = false;

      errorObj[key] = '*Required';
    });

    if (result) {
      setOfficeDetailsError(INITIAL_STATE);
    } else {
      setOfficeDetailsError(errorObj);
    }

    return result;
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder="Enter building wing"
        value={officeDetails.wing}
        onChangeText={val => handleChange('wing', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.wing}
        disabled={loading}
      />
      <Input
        placeholder="Enter office number"
        value={officeDetails.officeNumber}
        onChangeText={val => handleChange('officeNumber', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.officeNumber}
        disabled={loading}
      />
      <Input
        placeholder="Enter building floor number"
        value={officeDetails.floorNumber}
        onChangeText={val => handleChange('floorNumber', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.floorNumber}
        disabled={loading}
      />
      <Input
        placeholder="Enter office name"
        value={officeDetails.officeName}
        onChangeText={val => handleChange('officeName', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.officeName}
        disabled={loading}
      />
      <Input
        placeholder="Enter office owner name"
        value={officeDetails.officeOwnerName}
        onChangeText={val => handleChange('officeOwnerName', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.officeOwnerName}
        disabled={loading}
      />
      <Input
        placeholder="Contact number"
        value={officeDetails.contact}
        onChangeText={val => handleChange('contact', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.contact}
        disabled={loading}
      />
      <Input
        placeholder="Enter email address"
        value={officeDetails.email}
        onChangeText={val => handleChange('email', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.email}
        disabled={loading}
      />
      <Input
        placeholder="Enter GST number"
        value={officeDetails.gst}
        onChangeText={val => handleChange('gst', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.gst}
        disabled={loading}
      />
      <Input
        placeholder="Enter PAN number"
        value={officeDetails.pan}
        onChangeText={val => handleChange('pan', val)}
        inputStyle={globalStyles.fontDefault}
        errorMessage={officeDetailsError.pan}
        disabled={loading}
      />

      <View style={styles.saveBtnCont}>
        <Button
          titleStyle={styles.saveBtn}
          onPress={() => {
            if (!validateFields()) {
              return;
            }
            handleAddOffice();
          }}
          title={'Save'}
          loading={loading}
        />
      </View>
    </View>
  );
};

const AddOffice = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleAddOffice = async officeDetails => {
    setLoading(true);

    let error = false;

    await addOffice(officeDetails).catch(err => {
      // Todo: show error to user
      prettyPrint({
        msg: 'Error: in adding office ',
        err,
      });
      error = true;
    });

    setLoading(false);
  };

  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.pagetitleCont}>
          <Text style={globalStyles.heading}>Add Office Details</Text>
        </View>
        <RenderOfficeDetailsform
          loading={loading}
          handleAddOffice={handleAddOffice}
        />
      </ScrollView>
    </View>
  );
};

export default AddOffice;
