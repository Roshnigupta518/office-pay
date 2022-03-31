import React, {useState} from 'react';
import {StyleSheet, View, Image, TextInput, Pressable} from 'react-native';

import Text from '../../UI/Text';
import Picker from '../../UI/Picker';

import {
  getImageSrc,
  getShadowProperties,
} from '../../../global/utils/helperFunctions';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import {fonts} from '../../../global/fonts';
import {dummyProperties} from '../../../assets/dummy_data';

// Todo: make object keys dynamic with actual data format
// Todo: handle dynamic fields
// Todo: handle office invoice

const DUMMY_BUILDING_DATA = [
  {
    label: 'Building Name',
    val: null,
  },
  ...dummyProperties.map(ele => ({
    label: ele.property_name,
    val: ele.id,
  })),
];

const RenderHeader = ({buildingDetails}) => {
  return (
    <View style={styles.row}>
      <View style={styles.logoCont}>
        <Image style={styles.logo} source={getImageSrc(buildingDetails.logo)} />
      </View>
      <Text style={styles.invoice}>Invoice</Text>
    </View>
  );
};

const RenderPropertyDetails = ({buildingDetails}) => {
  return (
    <View style={styles.row}>
      <View style={styles.addressCont}>
        <Text style={styles.buildingAddress}>{buildingDetails.address}</Text>
      </View>
      <View style={styles.contactAndGSTCont}>
        <Text
          style={
            styles.contactAndGSTContDetails
          }>{`GST no. ${buildingDetails.gst}`}</Text>
        <Text style={styles.contactAndGSTContDetails}>
          {buildingDetails.mobile}
        </Text>
        <Text style={styles.contactAndGSTContDetails}>
          {buildingDetails.email}
        </Text>
      </View>
    </View>
  );
};

const RenderBillingForm = () => {
  const [building, setBuilding] = useState(null);

  return (
    <View>
      <Text style={styles.billingDetailsHeading}>Bill To:</Text>
      <View style={styles.billingDetailsCont}>
        <View style={styles.billToCont}>
          <Picker
            containerStyle={styles.pickerCont}
            selectedValue={building}
            onValueChange={(itemValue, itemIndex) => setBuilding(itemValue)}
            pickerData={DUMMY_BUILDING_DATA}
          />
          <Picker
            containerStyle={styles.pickerCont}
            selectedValue={building}
            onValueChange={(itemValue, itemIndex) => setBuilding(itemValue)}
            pickerData={DUMMY_BUILDING_DATA}
          />
          <Picker
            containerStyle={styles.pickerCont}
            selectedValue={building}
            onValueChange={(itemValue, itemIndex) => setBuilding(itemValue)}
            pickerData={DUMMY_BUILDING_DATA}
          />
          <Picker
            containerStyle={styles.pickerCont}
            selectedValue={building}
            onValueChange={(itemValue, itemIndex) => setBuilding(itemValue)}
            pickerData={DUMMY_BUILDING_DATA}
          />
        </View>
        <View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Invoice Number:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Invoice Date:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Due Date:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Total Amount:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderInvoiceItems = () => {
  const [numOfItems, setNumOfItems] = useState(1);

  console.log({numOfItems});

  const RenderInvoiceItemFields = () => {
    return (
      <View style={globalStyles.flexEnd}>
        <View style={styles.invoiceItemFieldsCont}>
          <TextInput
            style={styles.inputField}
            multiline={true}
            numberOfLines={3}
            placeholder={'Enter Item...'}
          />
          <TextInput style={styles.inputField} placeholder={'0'} />
          <TextInput style={styles.inputField} placeholder={'0'} />
          <TextInput style={styles.inputField} placeholder={'0'} />
        </View>
        {numOfItems > 1 && (
          <Pressable onPress={() => setNumOfItems(numOfItems - 1)}>
            <Text style={[globalStyles.anchor, {color: lightTheme.DANGER}]}>
              Remove
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  const invoiceItems = new Array(numOfItems).fill(<RenderInvoiceItemFields />);

  return (
    <View style={styles.invoiceItemsCont}>
      <View style={styles.invoiceItemHeader}>
        <Text style={styles.invoiceItemHeading}>Description</Text>
        <Text style={styles.invoiceItemHeading}>Qty.</Text>
        <Text style={styles.invoiceItemHeading}>Rate</Text>
        <Text style={styles.invoiceItemHeading}>Total</Text>
      </View>
      {invoiceItems}
      <Pressable onPress={() => setNumOfItems(numOfItems + 1)}>
        <Text style={globalStyles.anchor}>+ Add an Item</Text>
      </Pressable>
    </View>
  );
};

const RenderSummary = () => {
  return (
    <View style={styles.summaryCont}>
      <View style={[globalStyles.flexRow, globalStyles.spaceBetween]}>
        <Text style={globalStyles.heading}>Total Amount</Text>
        <Text style={globalStyles.heading}>₹ 0</Text>
      </View>
      <View style={styles.summaryBankDetails}>
        <Text>Bank Details</Text>
        <View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Bank Name:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Enter bank name'}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Account Holder:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Enter name'}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Account Number:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Account Number'}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>IFSC Code:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'IFSC Code'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const InvoiceTemplate = ({buildingDetails}) => {
  return (
    <View style={styles.container}>
      <RenderHeader buildingDetails={buildingDetails} />
      <RenderPropertyDetails buildingDetails={buildingDetails} />
      <View style={styles.hr} />
      <RenderBillingForm />
      <View style={styles.hr} />
      <RenderInvoiceItems />
      <View style={styles.hr} />
      <RenderSummary />
    </View>
  );
};

export default InvoiceTemplate;

const styles = StyleSheet.create({
  container: {
    ...getShadowProperties(5),
    backgroundColor: lightTheme.THEME,
    marginHorizontal: 10,
    padding: 10,
  },

  row: {
    marginBottom: 20,
    ...globalStyles.flexRow,
    justifyContent: 'space-between',
  },

  hr: {
    width: '100%',
    height: 1,
    backgroundColor: lightTheme.SECONDARY_TEXT,
  },

  logoCont: {
    width: '30%',
    height: 30,
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  addressCont: {
    width: '50%',
  },
  buildingAddress: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },
  contactAndGSTCont: {
    width: '50%',
    alignItems: 'flex-end',
  },
  contactAndGSTContDetails: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.xsmall,
    color: fonts.fontColor.dark,
  },

  billingDetailsCont: {
    margin: 10,
    flexDirection: 'row',
  },

  billingDetailsHeading: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.grey,
    marginLeft: 10,
    marginTop: 10,
  },

  billingDetailsfieldHeading: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  billToCont: {
    width: '45%',
  },

  fieldsCont: {
    ...globalStyles.flexRow,
    marginLeft: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },

  pickerCont: {
    width: '100%',
  },

  inputFieldCont: {
    width: '40%',
    backgroundColor: 'yellow',
    margin: 0,
    padding: 0,
  },

  inputField: {
    minWidth: 70,
    paddingHorizontal: 10,
    marginLeft: 10,
    padding: 0,
    borderWidth: 1,
    borderColor: lightTheme.SECONDARY_TEXT,
    borderRadius: 2,
  },

  invoiceItemsCont: {
    marginVertical: 10,
  },

  invoiceItemHeader: {
    ...globalStyles.flexRow,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.SECONDARY_TEXT,
    borderBottomRadius: 2,
    paddingBottom: 5,
  },

  invoiceItemFieldsCont: {
    ...globalStyles.flexRow,
    justifyContent: 'space-around',
    marginTop: 10,
  },

  invoiceItemHeading: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  summaryCont: {
    margin: 10,
  },
  
  summaryBankDetails: {
    marginVertical: 10,
  },
});
