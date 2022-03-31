import {Image, View} from 'react-native';
import React from 'react';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import Text from '../../Components/UI/Text';
import Button from '../../Components/UI/Button';

import {
  getImageSrc,
  getObjPropertyValue,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';

const PropertyInvoices = () => {
  // Todo: create invoice listing
}

const PropertyDetails = ({route, navigation}) => {
  // ! in production may be office is fetched through API
  const office = getObjPropertyValue(route.params, 'office');

  prettyPrint({office});

  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
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
          <Text style={styles.invoiceAmt}>Invoice Amount:  ₹ 60,000</Text>
        </View>
        <Button
          titleStyle={styles.createInvoiceBtnTitle}
          btnStyle={styles.createInvoiceBtnCont}
          onPress={() => {
            navigation.navigate('create-invoice', {
              office,
            })
          }}
          title={'Create Invoice'}
        />
      </View>
    </View>
  );
};

export default PropertyDetails;
