import cloneDeep from 'lodash.clonedeep';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createInvoice} from '../../API/Invoice';
import {dummyBuidlingDetails} from '../../assets/dummy_data';

import CustomMainHeader from '../../Components/Component-Parts/CustomMainHeader';
import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import InvoiceTemplate from '../../Components/Component-Parts/InvoiceTemplate';
import WithImageUpload from '../../Components/HOCs/ImageUploader';

import Button from '../../Components/UI/Button';
import ErrorAlert from '../../Components/UI/ErrorAlert';
import {lightTheme} from '../../global/Theme';
import {
  getObjPropertyValue,
  getPickerImageResp,
  prettyPrint,
} from '../../global/utils/helperFunctions';

import {styles} from './styles';

const INITIAL_BUILDING_STATE = {
  building: null,
  wing: null,
  floor: null,
  office: null,
};

const INITIAL_INVOICE_STATE = {
  invoice_number: '',
  invoice_date: '',
  invoice_due_date: '',
  invoice_total: '',
};

const INITIAL_INVOICE_ITEMS = [
  {
    desc: '',
    qty: '',
    rate: '',
    total: '',
  },
];

const INITIAL_BANK_DETAILS = {
  bank_name: '',
  holder_name: '',
  acc_num: '',
  ifsc_code: '',
};

const CreateInvoice = ({navigation, route, access_token}) => {
  const [buildDetails, setBuildDetails] = useState(INITIAL_BUILDING_STATE);
  const [invoiceDetails, setInvoiceDetails] = useState(INITIAL_INVOICE_STATE);
  const [invoiceItems, setInvoiceItems] = useState(INITIAL_INVOICE_ITEMS);
  const [bankDetails, setBankDetails] = useState(INITIAL_BANK_DETAILS);
  const [attachments, setAttachments] = useState(null);

  const [loading, setLoading] = useState(false);
  const [createInvoiceErr, setCreateInvoiceErr] = useState(false);
  const [errorText, setErrorText] = useState('');

  const {officeDetails} = getObjPropertyValue(route, 'params') || {
    officeDetails: null,
  };

  const hanldleTextChange = (key, value, objType) => {
    let obj;
    let setter;

    switch (objType) {
      case 'buildDetails':
        obj = buildDetails;
        setter = setBuildDetails;
        break;
      case 'invoiceDetails':
        obj = invoiceDetails;
        setter = setInvoiceDetails;
        break;
      default:
        obj = bankDetails;
        setter = setBankDetails;
        break;
    }

    if (obj && setter) {
      setter({
        ...obj,
        [key]: value,
      });
    }
  };

  const invoiceItemsSetters = {
    addItem: () => {
      setInvoiceItems([
        ...invoiceItems,
        {
          desc: '',
          qty: '',
          rate: '',
          total: '',
        },
      ]);
    },

    removeItem: index => {
      let clonedItems = [...invoiceItems];

      clonedItems.splice(index, 1);

      setInvoiceItems(clonedItems);
    },

    handleChangeInItems: (key, value, index) => {
      let clonedItems = cloneDeep(invoiceItems);

      let clonedItemObj = clonedItems[index];

      clonedItemObj = {
        ...clonedItemObj,
        [key]: value,
      };

      clonedItems.splice(index, 1, clonedItemObj);

      setInvoiceItems(clonedItems);
    },
  };

  const handleBuildingDetailsChange = (key, value) => {
    hanldleTextChange(key, value, 'buildDetails');
  };

  const handleInvoiceDetailsChange = (key, value) => {
    hanldleTextChange(key, value, 'invoiceDetails');
  };

  const handleBankDetailsChange = (key, value) => {
    hanldleTextChange(key, value, 'bankDetails');
  };

  const onSendInvoice = async () => {
    setLoading(true);

    let error = false;

    const requestData = new FormData();

    requestData.append('building', buildDetails.building);
    requestData.append('wing', buildDetails.wing);
    requestData.append('floor', buildDetails.floor);
    requestData.append('office', buildDetails.office);

    requestData.append('invoice_number', invoiceDetails.invoice_number);
    requestData.append('invoice_date', invoiceDetails.invoice_date);
    requestData.append('invoice_due_date', invoiceDetails.invoice_due_date);
    requestData.append('invoice_total', invoiceDetails.invoice_total);

    requestData.append('invoice_items', JSON.stringify(invoiceItems));

    requestData.append('bank_name', bankDetails.bank_name);
    requestData.append('holder_name', bankDetails.holder_name);
    requestData.append('acc_num', bankDetails.acc_num);
    requestData.append('ifsc_code', bankDetails.ifsc_code);
    
    requestData.append('invoice_subject', invoiceItems[0].desc);

    requestData.append('attachment', attachments);

    // const requestObj = {
    //   ...buildDetails,
    //   ...invoiceDetails,
    //   invoice_items: invoiceItems,
    //   ...bankDetails,
    //   invoice_subject: invoiceItems[0].desc,
    //   attachment: attachments,
    // };

    // prettyPrint(requestObj);

    // return;

    await createInvoice(access_token, requestData).catch(err => {
      prettyPrint({
        msg: 'Error: in create invoice ',
        err,
      });

      setErrorText(err);
      setCreateInvoiceErr(true);

      error = true;
    });

    if (!error) {
      console.log('success');
    }

    setLoading(false);
  };

  const setAttachmentResp = res => {
    const imageResp = getPickerImageResp(res);

    prettyPrint({imageResp});
    setAttachments(imageResp);
  };

  const AttachmentWithPicker = WithImageUpload(
    ({handleImageUpload, ...props}) => (
      <TouchableOpacity
        style={styles.uploadImageBtn}
        onPress={() => {
          handleImageUpload();
        }}>
        {!attachments && (
          <Icon
            name={'image-plus'}
            type={'material-community'}
            color={lightTheme.PRIMARY_COLOR}
          />
        )}
        <Text
          numberOfLines={1}
          style={[
            !attachments ? styles.uploadImageBtnText : styles.attachmentText,
          ]}>
          {!attachments ? 'Attachment' : attachments.file}
        </Text>
      </TouchableOpacity>
    ),
    setAttachmentResp,
    null,
  );

  return (
    <View style={styles.view}>
      {officeDetails ? (
        <CustomStackHeader goBack={() => navigation.goBack()} />
      ) : (
        <CustomMainHeader
          goToInit={() => {
            navigation.navigate('init');
          }}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.createInvoiceHeadCont}>
          <Text style={styles.pagetitle}>Create Invoice</Text>
          <AttachmentWithPicker />
        </View>
        <InvoiceTemplate
          officeDetails={officeDetails || false}
          buildingDetails={dummyBuidlingDetails}
          invoiceData={{
            buildDetails,
            invoiceDetails,
            invoiceItems,
            bankDetails,
          }}
          invoiceItemMethods={invoiceItemsSetters}
          {...{
            handleBankDetailsChange,
            handleBuildingDetailsChange,
            handleInvoiceDetailsChange,
          }}
        />
      </ScrollView>
      <View style={styles.sendBtnCont}>
        <Button
          loading={loading}
          titleStyle={styles.sendInvoiceBtnTitle}
          btnStyle={styles.sendInvoiceBtnCont}
          onPress={onSendInvoice}
          title={'Send Invoice'}
        />
      </View>
      <ErrorAlert
        alertProps={{
          showModal: createInvoiceErr,
          setShowModal: setCreateInvoiceErr,
        }}
        errText={errorText}
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

export default connect(mapStateToProps)(CreateInvoice);
