import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import InvoiceItem from './InvoiceItem';
import Text from '../../../../Components/UI/Text';

import {globalStyles} from '../../../../global/Styles';

import {getInvoices} from '../../../../API/Invoice';
import {lightTheme} from '../../../../global/Theme';
import {useSelector} from 'react-redux';

const useGetInvoices = access_token => {
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    (async () => {
      setInvoices(null);
      const items = await getInvoices(access_token);
      setInvoices(items);
    })();
  }, []);

  return invoices;
};

const Invoice = ({buildingOwner, goToListMore}) => {
  const {access_token} = useSelector(state => state.auth);

  const invoices = useGetInvoices(access_token);

  const {t} = useTranslation();

  if (!invoices) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      <Text style={globalStyles.heading}>{t('dashboard.invoices.title')}</Text>
      {invoices.map((invoice, index) => {
        if (index > 2) {
          return <View key={index} />;
        }

        return (
          <InvoiceItem
            t={t}
            buildingOwner={buildingOwner}
            invoiceDetails={invoice}
          />
        );
      })}
      <Pressable
        onPress={() =>
          goToListMore({
            data: invoices,
            renderItem: ({item}) => (
              <InvoiceItem
                t={t}
                buildingOwner={buildingOwner}
                invoiceDetails={item}
              />
            ),
          })
        }>
        <Text style={styles.showMore}>{t('show_more')}</Text>
      </Pressable>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  view: {
    width: '90%',
    marginVertical: 20,
    flex: 1,
  },

  loaderCont: {
    ...globalStyles.placeCenter,
    paddingTop: 40,
    paddingRight: 30,
  },

  showMore: {
    ...globalStyles.anchor,
    textDecorationLine: 'underline',
    paddingRight: 0,
  },
});
