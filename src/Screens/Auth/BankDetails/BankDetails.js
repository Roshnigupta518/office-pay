import React, {useState} from 'react';
import {Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import AuthBgImage from '../../../Components/Component-Parts/AuthBGImage';
import Text from '../../../Components/UI/Text';
import Input from '../../../Components/UI/Input';
import Button from '../../../Components/UI/Button';
import ErrorAlert from '../../../Components/UI/ErrorAlert';
import CustomStackHeader from '../../../Components/Component-Parts/CustomStackHeader';

import {styles} from './styles';
import {globalStyles} from '../../../global/Styles';

import {
  getObjPropertyValue,
  prettyPrint,
} from '../../../global/utils/helperFunctions';
import {addBuidlingDetails} from '../../../store/actions/BuildingActions';
import {ValueEmpty} from '../../../global/utils/Validations';
import {addBank} from '../../../API/Bank';

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
  const fromDash = getObjPropertyValue(route.params, 'fromDash');

  const [loading, setLoading] = useState(false);
  const [addBankErr, setAddBankErr] = useState(false);
  const [addBankErrText, setAddBankErrText] = useState('');

  const handleNextPress = async bankDetails => {
    setLoading(true);

    let error = false;

    const requestOptions = {
      building_id: buildingDetails.id,
      account_holder: bankDetails.accHolderName,
      account_number: bankDetails.accNumber,
      ifsc_code: bankDetails.ifsc,
    };

    const bankData = await addBank(requestOptions).catch(err => {
      prettyPrint({
        msg: 'Error: in add bank details',
        err,
      });
      error = true;

      setAddBankErrText(err);
      setAddBankErr(true);
    });

    setLoading(false);
    if (!error) {
      const route = fromDash ? 'dashboard' : 'home';
      
      console.log(`added bank details with account no:  ${bankData.account_number}`);

      navigation.navigate(route);
    }
  };

  const goToDashboard = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.view}>
      {fromDash ? (
        <CustomStackHeader goBack={() => navigation.goBack()} />
      ) : (
        <AuthBgImage />
      )}
      <ScrollView style={styles.container}>
        {!fromDash ? (
          <View style={styles.header}>
            <Pressable style={styles.headerLeft} onPress={goToDashboard}>
              <Text>Skip</Text>
            </Pressable>
            <View style={styles.headerMid}>
              <Text>2 to 2 Step</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        ) : (
          <View style={styles.placeholderView} />
        )}
        <View style={styles.pageTitle}>
          <Text style={globalStyles.heading}>Add your Bank Detail</Text>
        </View>
        <BankDetailsForm loading={loading} onNextPress={handleNextPress} />
      </ScrollView>
      <ErrorAlert
        alertProps={{
          showModal: addBankErr,
          setShowModal: setAddBankErr,
        }}
        errText={addBankErrText}
      />
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
