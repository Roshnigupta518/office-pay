import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {dummyBuidlingDetails} from '../../assets/dummy_data';

import CustomMainHeader from '../../Components/Component-Parts/CustomMainHeader';
import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import InvoiceTemplate from '../../Components/Component-Parts/InvoiceTemplate';

import Button from '../../Components/UI/Button';
import {getObjPropertyValue} from '../../global/utils/helperFunctions';

import {styles} from './styles';

const CreateInvoice = ({navigation, route}) => {
  const {officeDetails} = getObjPropertyValue(route, 'params') || {
    officeDetails: null,
  };

  return (
    <View style={styles.view}>
      {officeDetails ? (
        <CustomStackHeader goBack={() => navigation.goBack()} />
      ) : (
        <CustomMainHeader />
      )}
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.pagetitle}>Create Invoice</Text>
        <InvoiceTemplate
          officeDetails={officeDetails || false}
          buildingDetails={dummyBuidlingDetails}
        />
      </ScrollView>
      <View style={styles.sendBtnCont}>
        <Button
          titleStyle={styles.sendInvoiceBtnTitle}
          btnStyle={styles.sendInvoiceBtnCont}
          onPress={() => {
            // Todo: handle send invoice
          }}
          title={'Send Invoice'}
        />
      </View>
    </View>
  );
};

export default CreateInvoice;
