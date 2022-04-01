import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import InvoiceItem from './InvoiceItem';
import Text from '../../../../Components/UI/Text';

import {globalStyles} from '../../../../global/Styles';

import {getInvoices} from '../../../../API/Invoice';
import { lightTheme } from '../../../../global/Theme';

const useGetInvoices = () => {
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    (async () => {
      setInvoices(null);
      const items = await getInvoices();
      setInvoices(items);
    })();
  }, []);

  return invoices;
};

const Invoice = () => {
  const invoices = useGetInvoices();

  if (!invoices) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <Text style={globalStyles.heading}>Due Invoice</Text>
      {invoices.map(invoice => (
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

  loaderCont: {
    ...globalStyles.placeCenter,
    paddingTop: 40,
    paddingRight: 30,
  },
});
