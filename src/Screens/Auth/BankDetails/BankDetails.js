import React, {useState} from 'react';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';

import {styles} from './styles';

import {globalStyles} from '../../../global/Styles';
import {
  getObjPropertyValue,
  prettyPrint,
} from '../../../global/utils/helperFunctions';
import {connect} from 'react-redux';
import {addBuidlingDetails} from '../../../store/actions/BuildingActions';
import {ValueEmpty} from '../../../global/utils/Validations';

const INITIAL_STATE = {
  accHolderName: '',
  accNumber: '',
  reAccNumber: '',
  ifsc: '',
};

const BankDetailsForm = ({loading, onNextPress}) => {
  const [bankDetails, setBankDetails] = useState(INITIAL_STATE);

  const [bankDetailsErr, setBankDetailsErr] = useState(INITIAL_STATE);

  const validateFields = () => {
    let result = true;

    const accHolderNameError = ValueEmpty(bankDetails.accHolderName);
    const accNumberError = ValueEmpty(bankDetails.accNumber);
    const reAccNumberError = ValueEmpty(bankDetails.reAccNumber);
    const ifscError = ValueEmpty(bankDetails.ifsc);

    console.log({
      accHolderNameError,
      accNumberError,
      reAccNumberError,
      ifscError,
    });

    let errorObj = {
      ...bankDetailsErr,
    };

    if (accHolderNameError) {
      result = false;

      errorObj['accHolderName'] = '*Required';
    } else {
      errorObj['accHolderName'] = '';
    }

    if (accNumberError) {
      result = false;

      errorObj['accNumber'] = '*Required';
    } else {
      errorObj['accNumber'] = '';
    }

    if (reAccNumberError) {
      result = false;

      errorObj['reAccNumber'] = '*Required';
    } else {
      errorObj['reAccNumber'] = '';
    }

    if (bankDetails.accNumber !== bankDetails.reAccNumber) {
      result = false;

      errorObj['reAccNumber'] = 'Account numbers do not match';
    } else {
      errorObj['reAccNumber'] = '';
    }

    if (ifscError) {
      result = false;

      errorObj['ifsc'] = '*Required';
    } else {
      errorObj['ifsc'] = '';
    }

    if (result) {
      setBankDetailsErr(INITIAL_STATE);
    } else {
      setBankDetailsErr(errorObj);
    }

    return result;
  };

  handleOnChange = (key, val) => {
    setBankDetails({
      ...bankDetails,
      [key]: val,
    });
  };

  return (
    <View style={styles.detailsFormCont}>
      <Input
        value={bankDetails.accHolderName}
        onChangeText={value => handleOnChange('accHolderName', value)}
        style={globalStyles.textDefault}
        placeholder={'Account Holder Name'}
        errorMessage={bankDetailsErr.accHolderName}
        disabled={loading}
      />
      <Input
        value={bankDetails.accNumber}
        onChangeText={value => handleOnChange('accNumber', value)}
        style={globalStyles.textDefault}
        placeholder={'Enter your account number'}
        errorMessage={bankDetailsErr.accNumber}
        disabled={loading}
      />
      <Input
        value={bankDetails.reAccNumber}
        onChangeText={value => handleOnChange('reAccNumber', value)}
        style={globalStyles.textDefault}
        placeholder={'Re-enter your account number'}
        errorMessage={bankDetailsErr.reAccNumber}
        disabled={loading}
      />
      <Input
        value={bankDetails.ifsc}
        onChangeText={value => handleOnChange('ifsc', value)}
        style={globalStyles.textDefault}
        placeholder={'Enter IFSC Code'}
        errorMessage={bankDetailsErr.ifsc}
        disabled={loading}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={() => {
          if (!validateFields()) {
            return;
          }

          onNextPress(bankDetails);
        }}
        title={'Next'}
        loading={loading}
        loadingProps={{size: 'large'}}
      />
    </View>
  );
};

const BankDetails = ({navigation, route, doAddBuildingDetails}) => {
  const buildingDetails = getObjPropertyValue(route.params, 'buildingDetails');

  const [loading, setLoading] = useState(false);

  const handleNextPress = async bankDetails => {
    setLoading(true);

    let error = false;

    await doAddBuildingDetails({...buildingDetails, ...bankDetails}).catch(
      err => {
        // Todo: show error to user
        prettyPrint({
          msg: 'Error: in add building details',
          err,
        });
        error = true;
      },
    );

    setLoading(false);
    if (!error) {
      navigation.navigate('home');
    }
  };

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
        <BankDetailsForm loading={loading} onNextPress={handleNextPress} />
      </ScrollView>
    </View>
  );
};

// export default BankDetails;

const mapStateToProps = state => {
  const {buildingDetails} = state;

  prettyPrint({buildingDetails});

  return {
    buildingDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  doAddBuildingDetails: data => dispatch(addBuidlingDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
