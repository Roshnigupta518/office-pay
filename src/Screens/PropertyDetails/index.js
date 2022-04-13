import {Image, Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import InvoiceItem from '../../Components/Component-Parts/InvoiceItem';
import Text from '../../Components/UI/Text';
import Button from '../../Components/UI/Button';

import {
  getImageSrc,
  getObjPropertyValue,
} from '../../global/utils/helperFunctions';

import {styles} from './styles';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';
import {dummyInvoiceDashboard} from '../../assets/dummy_data';
import {connect} from 'react-redux';

const PropertyInvoices = ({buildingOwner, goToListMore}) => {
  return (
    <View style={styles.invoiceCont}>
      {dummyInvoiceDashboard.map((invoice, key) => {
        if (key > 2) {
          return <View key={key} />;
        }

        return (
          <InvoiceItem
            key={key}
            buildingOwner={buildingOwner}
            invoiceDetails={invoice}
            dontShowProperty
          />
        );
      })}
      <Pressable
        onPress={() =>
          goToListMore({
            data: dummyInvoiceDashboard,
            renderItem: ({item, index}) => (
              <InvoiceItem
                key={index}
                buildingOwner={buildingOwner}
                invoiceDetails={item}
                dontShowProperty
              />
            ),
          })
        }>
        <Text style={styles.showMore}>Show More</Text>
      </Pressable>
    </View>
  );
};

const RenderInvoiceDetailsHeader = () => {
  return (
    <View style={styles.invoiceHeaderCont}>
      <Text style={globalStyles.heading}>Invoice Details</Text>
    </View>
  );
};

const PropertyDetails = ({route, navigation, buildingOwner}) => {
  // ! in production may be office is fetched through API
  const office = getObjPropertyValue(route.params, 'office');

  // prettyPrint({office});

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
                  Edit Details
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
              <Text style={styles.pendingAmtHead}>Pending Amount: ₹ </Text>
              <Text style={styles.pendingAmt}>3500</Text>
            </View>
            <Text style={styles.invoiceAmt}>Invoice Amount: ₹ 60,000</Text>
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
              title={'Create Invoice'}
            />
          )}
        </View>
        <RenderInvoiceDetailsHeader />
        <PropertyInvoices
          buildingOwner={buildingOwner}
          goToListMore={goToListMore}
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
