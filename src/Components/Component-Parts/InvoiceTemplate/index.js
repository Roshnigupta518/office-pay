import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import Text from '../../UI/Text';
import Picker from '../../UI/Picker';

import {
  getImageSrc,
  getShadowProperties,
  prettyPrint,
} from '../../../global/utils/helperFunctions';

import {getBuildings} from '../../../API/Building';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';
import {fonts} from '../../../global/fonts';
import {dummyProperties} from '../../../assets/dummy_data';
import {connect} from 'react-redux';
import {getOffices} from '../../../API/Offices';
import cache from '../../../global/utils/cache';
import WithDatePicker from '../../HOCs/DatePicker';

// Todo: fix overflowing inputs

const DUMMY_BUILDING_DATA = [
  {
    label: 'Building Name',
    val: null,
  },
  ...dummyProperties.map(ele => ({
    label: ele.property_name, // building_name
    val: ele.id,
  })),
];

const getDropDownData = (data, label, labelKey, eleIdKey) => {
  if (!data) {
    return [
      {
        label: label,
        val: null,
      },
    ];
  }

  return [
    {
      label: label,
      val: null,
    },
    ...data.map(ele => ({
      label: ele[labelKey], // building_name
      val: ele[eleIdKey],
    })),
  ];
};

const useGetBuildings = () => {
  const [buildings, setBuildings] = useState(null);

  useEffect(() => {
    (async () => {
      setBuildings(null);
      const cache_buildings = await cache.get('buildings');
      setBuildings(cache_buildings);
    })();
  }, []);

  return buildings;
};

const useGetOffices = (propertyID, token) => {
  const [offices, setOffices] = useState(null);

  useEffect(() => {
    (async () => {
      setOffices(null);
      const offices = await getOffices(propertyID, token).catch(err => {
        console.log({err});
        setOffices([]);
      });
      setOffices(offices);
    })();
  }, [propertyID]);

  return offices;
};

const useGetOfficeWings = offices => {
  const [buildingWingDropdownData, setBuildingWingDropdownData] = useState(
    getDropDownData(null, 'Building Wing', 'wing', 'wing'),
  );

  useEffect(() => {
    if (offices) {
      const officeWings = Object.keys(offices).map(wing => ({wing}));

      setBuildingWingDropdownData(
        getDropDownData(officeWings, 'Building Wing', 'wing', 'wing'),
      );
    }
  }, [offices]);

  return buildingWingDropdownData;
};

const useGetFloors = (selectedWing, offices) => {
  const [floorDropdownData, setFloorDropdownData] = useState(
    getDropDownData(null, 'Floor Number', 'floor', 'floor'),
  );

  useEffect(() => {
    if (selectedWing) {
      if (!offices) {
        setFloorDropdownData(
          getDropDownData(null, 'Floor Number', 'floor', 'floor'),
        );
      }

      const wingWiseData = offices[selectedWing];

      const floorData = wingWiseData.map(floorObj => ({floor: floorObj.title}));

      setFloorDropdownData(
        getDropDownData(floorData, 'Floor Number', 'floor', 'floor'),
      );
    }
  }, [selectedWing, offices]);

  return floorDropdownData;
};

const useGetFloorWiseOffices = (selectedWing, selectedFloor, offices) => {
  const [floorWiseOfficesDropdownData, setFloorWiseOfficesDropdownData] =
    useState(getDropDownData(null, 'Office', 'office', 'office'));

  useEffect(() => {
    if (selectedWing) {
      if (!offices) {
        setFloorWiseOfficesDropdownData(
          getDropDownData(null, 'Office', 'office', 'office'),
        );
      }

      const wingWiseData = offices[selectedWing];

      let OfficeData = null;

      wingWiseData.some(floorObj => {
        if (floorObj.title === selectedFloor) {
          OfficeData = floorObj.data;
          return true;
        }
        return false;
      });

      setFloorWiseOfficesDropdownData(
        getDropDownData(OfficeData, 'Select Office', 'office_name', 'id'),
      );
    }
  }, [selectedWing, selectedFloor, offices]);

  return floorWiseOfficesDropdownData;
};

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

const RenderBillingForm = ({
  officeDetails,
  billingFormState,
  invoiceFormState,
  handleBuildingDetailsChange,
  handleInvoiceDetailsChange,
  buildingDropdownData,
  wingsDropDownData,
  floorDropDownData,
  floorWiseOfficeDropDownData,
}) => {
  const InvoiceDateComp = WithDatePicker(
    ({openPicker}) => (
      <TouchableOpacity
        onPress={() => {
          openPicker();
        }}>
        <View style={styles.datePickerValueCont}>
          <Text style={globalStyles.textSmallSecondary}>
            {invoiceFormState.invoice_date}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    date => handleInvoiceDetailsChange('invoice_date', date),
  );

  const InvoiceDueDateComp = WithDatePicker(
    ({openPicker}) => (
      <TouchableOpacity
        onPress={() => {
          openPicker();
        }}>
        <View style={styles.datePickerValueCont}>
          <Text style={globalStyles.textSmallSecondary}>
            {invoiceFormState.invoice_due_date}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    date => handleInvoiceDetailsChange('invoice_due_date', date),
  );

  return (
    <View>
      <Text style={styles.billingDetailsHeading}>Bill To:</Text>
      <View style={styles.billingDetailsCont}>
        {officeDetails ? (
          <View style={styles.billToCont}>
            <Text style={styles.officeName}>{officeDetails.office_name}</Text>
            <Text numberOfLines={2} style={styles.officeAddress}>
              {officeDetails.office_address}
            </Text>
            <Text
              style={
                styles.officeDetailsText
              }>{`GST no. ${officeDetails.gst_number}`}</Text>
            <Text style={styles.officeDetailsText}>
              {`+91 - ${officeDetails.contact_number}`}
            </Text>
            <Text style={styles.officeDetailsText}>
              {officeDetails.email_address}
            </Text>
          </View>
        ) : (
          <View style={styles.billToCont}>
            <Picker
              containerStyle={styles.pickerCont}
              selectedValue={billingFormState.building}
              onValueChange={itemValue =>
                handleBuildingDetailsChange('building', itemValue)
              }
              pickerData={buildingDropdownData}
            />
            <Picker
              containerStyle={styles.pickerCont}
              selectedValue={billingFormState.wing}
              onValueChange={itemValue =>
                handleBuildingDetailsChange('wing', itemValue)
              }
              pickerData={wingsDropDownData}
            />
            <Picker
              containerStyle={styles.pickerCont}
              selectedValue={billingFormState.floor}
              onValueChange={itemValue =>
                handleBuildingDetailsChange('floor', itemValue)
              }
              pickerData={floorDropDownData}
            />
            <Picker
              containerStyle={styles.pickerCont}
              selectedValue={billingFormState.office}
              onValueChange={itemValue =>
                handleBuildingDetailsChange('office', itemValue)
              }
              pickerData={floorWiseOfficeDropDownData}
            />
          </View>
        )}

        <View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Invoice Number:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
              value={invoiceFormState.invoice_number}
              onChangeText={val =>
                handleInvoiceDetailsChange('invoice_number', val)
              }
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Invoice Date:</Text>
            {/* <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
              value={invoiceFormState.invoice_date}
              onChangeText={val =>
                handleInvoiceDetailsChange('invoice_date', val)
              }
            /> */}
            <InvoiceDateComp />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Due Date:</Text>
            {/* <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
              value={invoiceFormState.invoice_due_date}
              onChangeText={val =>
                handleInvoiceDetailsChange('invoice_due_date', val)
              }
            /> */}
            <InvoiceDueDateComp />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Total Amount:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={''}
              value={invoiceFormState.invoice_total}
              onChangeText={val =>
                handleInvoiceDetailsChange('invoice_total', val)
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderInvoiceItems = ({invoiceItemData, invoiceItemMethods}) => {
  return (
    <View style={styles.invoiceItemsCont}>
      <View style={styles.invoiceItemHeader}>
        <Text style={styles.invoiceItemHeading}>Description</Text>
        <Text style={styles.invoiceItemHeading}>Qty.</Text>
        <Text style={styles.invoiceItemHeading}>Rate</Text>
        <Text style={styles.invoiceItemHeading}>Total</Text>
      </View>
      {invoiceItemData.map((item, i) => (
        <RenderInvoiceItemFields
          key={i}
          item={item}
          index={i}
          handleChangeInItems={invoiceItemMethods.handleChangeInItems}
          removeItem={invoiceItemMethods.removeItem}
          numOfItems={invoiceItemData.length}
        />
      ))}
      <Pressable onPress={invoiceItemMethods.addItem}>
        <Text style={globalStyles.anchor}>+ Add an Item</Text>
      </Pressable>
    </View>
  );
};

const RenderInvoiceItemFields = ({
  item,
  index,
  handleChangeInItems,
  removeItem,
  numOfItems,
}) => {
  const getTotal = () => {
    if (item.qty && item.rate) {
      const total = (parseInt(item.qty, 10) * parseFloat(item.rate))
        .toFixed(2)
        .toString();

      handleChangeInItems('total', total, index);
    }
  };

  return (
    <View style={globalStyles.flexEnd}>
      <View style={styles.invoiceItemFieldsCont}>
        <TextInput
          style={[styles.inputField]}
          multiline={true}
          numberOfLines={3}
          placeholder={'Enter Item...'}
          value={item.desc}
          onChangeText={val => handleChangeInItems('desc', val, index)}
        />
        <TextInput
          style={styles.inputField}
          value={item.qty}
          placeholder={'0'}
          onChangeText={val => handleChangeInItems('qty', val, index)}
        />
        <TextInput
          style={styles.inputField}
          value={item.rate}
          placeholder={'0'}
          onChangeText={val => {
            handleChangeInItems('rate', val, index);
          }}
        />
        <TextInput
          style={styles.inputField}
          value={item.total}
          placeholder={'0'}
          onFocus={() => getTotal()}
          onChangeText={val => handleChangeInItems('total', val, index)}
        />
      </View>
      {numOfItems > 1 && (
        <Pressable onPress={() => removeItem(index)}>
          <Text style={[globalStyles.anchor, {color: lightTheme.DANGER}]}>
            Remove
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const RenderSummary = ({
  bankDetails,
  invoiceTotal,
  handleBankDetailsChange,
}) => {
  return (
    <View style={styles.summaryCont}>
      <View style={[globalStyles.flexRow, globalStyles.spaceBetween]}>
        <Text style={globalStyles.heading}>Total Amount</Text>
        <Text style={globalStyles.heading}>₹ {invoiceTotal}</Text>
      </View>
      <View style={styles.summaryBankDetails}>
        <Text>Bank Details</Text>
        <View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>Bank Name:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Enter bank name'}
              value={bankDetails.bank_name}
              onChangeText={val => handleBankDetailsChange('bank_name', val)}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Account Holder:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Enter name'}
              value={bankDetails.holder_name}
              onChangeText={val => handleBankDetailsChange('holder_name', val)}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>
              Account Number:
            </Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'Account Number'}
              value={bankDetails.acc_num}
              onChangeText={val => handleBankDetailsChange('acc_num', val)}
            />
          </View>
          <View style={styles.fieldsCont}>
            <Text style={styles.billingDetailsfieldHeading}>IFSC Code:</Text>
            <TextInput
              style={[globalStyles.textSmallSecondary, styles.inputField]}
              placeholder={'IFSC Code'}
              value={bankDetails.ifsc_code}
              onChangeText={val => handleBankDetailsChange('ifsc_code', val)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const InvoiceTemplate = ({
  buildingDetails,
  officeDetails,
  invoiceData,
  invoiceItemMethods,
  handleBankDetailsChange,
  handleBuildingDetailsChange,
  handleInvoiceDetailsChange,
  // store props
  access_token,
}) => {
  let buildings = useGetBuildings();
  let offices = useGetOffices(invoiceData.buildDetails.building, access_token);

  // prettyPrint({buildings, offices});

  const buildingDropdownData = getDropDownData(
    buildings,
    'Building Name',
    'building_name',
    'id',
  );

  const wingsDropDownData = useGetOfficeWings(offices);

  const floorDropDownData = useGetFloors(
    invoiceData.buildDetails.wing,
    offices,
  );

  const floorWiseOfficeDropDownData = useGetFloorWiseOffices(
    invoiceData.buildDetails.wing,
    invoiceData.buildDetails.floor,
    offices,
  );

  const getInvoiceTotal = () => {
    const initialValue = 0;

    const total = invoiceData.invoiceItems.reduce(
      (previousValue, currentValue) => {

        if (currentValue.total) {
          return previousValue + parseFloat(currentValue.total);
        }
        return previousValue + 0;
      },
      initialValue,
    );

    return total;
  };

  // prettyPrint({
  //   buildingDropdownData,
  //   wingsDropDownData,
  //   floorDropDownData,
  //   floorWiseOfficeDropDownData,
  // });

  return (
    <View style={styles.container}>
      <RenderHeader buildingDetails={buildingDetails} />
      <RenderPropertyDetails buildingDetails={buildingDetails} />
      <View style={styles.hr} />
      <RenderBillingForm
        officeDetails={officeDetails}
        billingFormState={invoiceData.buildDetails}
        invoiceFormState={invoiceData.invoiceDetails}
        {...{
          handleBuildingDetailsChange,
          handleInvoiceDetailsChange,
          // drop-down data
          buildingDropdownData,
          wingsDropDownData,
          floorDropDownData,
          floorWiseOfficeDropDownData,
        }}
      />
      <View style={styles.hr} />
      <RenderInvoiceItems
        {...{invoiceItemData: invoiceData.invoiceItems, invoiceItemMethods}}
      />
      <View style={styles.hr} />
      <RenderSummary
        invoiceTotal={getInvoiceTotal()}
        bankDetails={invoiceData.bankDetails}
        {...{handleBankDetailsChange}}
      />
    </View>
  );
};

const mapStateToProps = state => {
  const {access_token} = state.auth;

  return {
    access_token,
  };
};

export default connect(mapStateToProps)(InvoiceTemplate);

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

  datePickerValueCont: {
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

  // ==========================

  officeName: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  officeAddress: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
  },

  officeDetailsText: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.dark,
    marginTop: 5,
  },
});
