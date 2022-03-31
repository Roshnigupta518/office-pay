import {StyleSheet, View} from 'react-native';
import React from 'react';

import InvoiceItem from './InvoiceItem';
import Text from '../../../../Components/UI/Text';

import {dummyInvoiceDashboard} from '../../../../assets/dummy_data';
import {globalStyles} from '../../../../global/Styles';

const Invoice = () => {
  return (
    <View style={styles.view}>
      <Text style={globalStyles.heading}>Due Invoice</Text>
      {dummyInvoiceDashboard.map(invoice => (
        <InvoiceItem invoiceDetails={invoice} />
      ))}
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  view: {
    width: '90%',
    marginVertical: 20,
  },
});
