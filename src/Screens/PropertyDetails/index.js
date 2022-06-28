import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import InvoiceItem from '../../Components/Component-Parts/InvoiceItem';
import Text from '../../Components/UI/Text';
import Button from '../../Components/UI/Button';

import {
  getImageSrc,
  getObjPropertyValue,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {styles} from './styles';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';
import {dummyInvoiceDashboard} from '../../assets/dummy_data';
import {connect, useSelector} from 'react-redux';
import {getInvoices} from '../../API/Invoice';
import {useTranslation} from 'react-i18next';

const useGetInvoices = (access_token, officeID) => {
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    (async () => {
      setInvoices(null);
      const items = await getInvoices(access_token, officeID);
      setInvoices(items);
    })();
  }, []);

  return invoices;
};

const PropertyInvoices = ({buildingOwner, goToListMore, office, t}) => {
  const {access_token} = useSelector(state => state.auth);

  const invoices = useGetInvoices(access_token, office.id);

  if (!invoices) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.invoiceCont}>
      {invoices.map((invoice, key) => {
        if (key > 2) {
          return <View key={key} />;
        }

        console.log({officeID: invoice.office_id});

        return (
          <InvoiceItem
            key={key}
            buildingOwner={buildingOwner}
            invoiceDetails={invoice}
            dontShowProperty
            t={t}
          />
        );
      })}
      <Pressable
        onPress={() =>
          goToListMore({
            data: invoices,
            renderItem: ({item, index}) => (
              <InvoiceItem
                key={index}
                buildingOwner={buildingOwner}
                invoiceDetails={item}
                dontShowProperty
                t={t}
              />
            ),
          })
        }>
        <Text style={styles.showMore}>{t('show_more')}</Text>
      </Pressable>
    </View>
  );
};

const RenderInvoiceDetailsHeader = ({t}) => {
  return (
    <View style={styles.invoiceHeaderCont}>
      <Text style={globalStyles.heading}>
        {t('officeDetails.invoices.header.title')}
      </Text>
    </View>
  );
};

const PropertyDetails = ({route, navigation}) => {
  // ! in production may be office is fetched through API
  const office = getObjPropertyValue(route.params, 'office');

  // prettyPrint({office});
  const {buildingOwner} = useSelector(state => state.auth);

  const {t} = useTranslation();

  const goToListMore = props => {
    navigation.navigate('list-more', props);
  };

  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.officeImgCont}>
          <Image
            source={getImageSrc(
              require('../../assets/images/placeholders/office_image.png'),
            )}
            style={styles.officeImg}
          />
        </View>
        <View style={styles.officeDetailsCont}>
          <View style={[globalStyles.flexRow, globalStyles.spaceBetween]}>
            <Text
              style={styles.officeNum}>{`Office ${office.office_number}`}</Text>
            {buildingOwner && (
              <View style={styles.editOfficeDetails}>
                <Icon
                  name={'edit'}
                  type={'feather'}
                  size={15}
                  color={lightTheme.PRIMARY_COLOR}
                  style={styles.editIcon}
                />
                <Text style={[globalStyles.anchor, styles.editText]}>
                  {t('officeDetails.edit')}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.nameAddCont}>
            <Text style={styles.officeName}>{office.office_name}</Text>
            <Text style={styles.officeAddress}>{office.office_address}</Text>
          </View>
          <View style={styles.paymentDetailsCont}>
            <View style={globalStyles.flexRow}>
              <Text style={styles.pendingAmtHead}>
                {t('officeDetails.pending')}: ₹{' '}
              </Text>
              <Text style={styles.pendingAmt}>3500</Text>
            </View>
            <Text style={styles.invoiceAmt}>
              {t('officeDetails.invoiceAmt')}: ₹ 60,000
            </Text>
          </View>
          {buildingOwner && (
            <Button
              titleStyle={styles.createInvoiceBtnTitle}
              btnStyle={styles.createInvoiceBtnCont}
              onPress={() => {
                navigation.navigate('create-invoice', {
                  officeDetails: office,
                });
              }}
              title={t('officeDetails.createInvoice.btn.title')}
            />
          )}
        </View>
        <RenderInvoiceDetailsHeader t={t} />
        <PropertyInvoices
          buildingOwner={buildingOwner}
          goToListMore={goToListMore}
          office={office}
          t={t}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {buildingOwner} = state.auth;

  return {
    buildingOwner,
  };
};

export default connect(mapStateToProps)(PropertyDetails);
