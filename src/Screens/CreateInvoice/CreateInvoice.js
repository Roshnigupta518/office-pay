import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {dummyBuidlingDetails} from '../../assets/dummy_data';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import InvoiceTemplate from '../../Components/Component-Parts/InvoiceTemplate';
import Button from '../../Components/UI/Button';

import {styles} from './styles';

const CreateInvoice = ({navigation}) => {
  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.pagetitle}>Create Invoice</Text>
        <InvoiceTemplate buildingDetails={dummyBuidlingDetails} />
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
