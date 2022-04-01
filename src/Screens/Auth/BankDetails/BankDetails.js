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

const BankDetailsForm = ({loading, onNextPress}) => {
  const [bankDetails, setBankDetails] = useState({
    accHolderName: '',
    accNumber: '',
    reAccNumber: '',
    ifsc: '',
  });

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
        disabled={loading}
      />
      <Input
        value={bankDetails.accNumber}
        onChangeText={value => handleOnChange('accNumber', value)}
        style={globalStyles.textDefault}
        placeholder={'Enter your account number'}
        disabled={loading}
      />
      <Input
        value={bankDetails.reAccNumber}
        onChangeText={value => handleOnChange('reAccNumber', value)}
        style={globalStyles.textDefault}
        placeholder={'Re-enter your account number'}
        disabled={loading}
      />
      <Input
        value={bankDetails.ifsc}
        onChangeText={value => handleOnChange('ifsc', value)}
        style={globalStyles.textDefault}
        placeholder={'Enter IFSC Code'}
        disabled={loading}
      />
      <Button
        titleStyle={globalStyles.headingWhite}
        onPress={() => {
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
      navigation.navigate('dashboard');
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
  doAddBuildingDetails: data =>
    dispatch(async innerdispatch => {
      await addBuidlingDetails(innerdispatch, data);
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
