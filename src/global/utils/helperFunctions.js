import orderBy from 'lodash.orderby';
import {fonts} from '../fonts';
import {lightTheme} from '../Theme';

export const prettyPrint = raw => {
  console.log(JSON.stringify(raw, null, 4));
};

export const getImageSrc = src => (typeof src === 'string' ? {uri: src} : src);

export const isJSObj = obj => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

export const getObjPropertyValue = (obj, property) => {
  return isJSObj(obj) && obj.hasOwnProperty(property)
    ? obj[property]
    : // : {[property]: null};
      null;
};

export const emptyObj = obj => {
  if (!obj) {
    return null;
  }

  let result = new Boolean(Object.keys(obj).length);
  return !result;
};

export const getShadowProperties = (elevation, width, height, radius) => {
  return {
    shadowColor: '#000',
    shadowOffset: {width: width || 0, height: height || 3},
    shadowOpacity: 0.8,
    shadowRadius: radius || 5,
    elevation: elevation || 5,
  };
};

export const getPickerImageResp = res => {
  const respArr = getObjPropertyValue(res, 'assets');
  const imgResp = Array.isArray(respArr) && respArr.length ? respArr[0] : null;

  if (imgResp) {
    return {
      uri: imgResp.uri,
      file: imgResp.fileName,
      type: imgResp.type,
    };
  }

  return false;
};

// * office listing ===================

export const sortOfficeDetails = offices => {
  return orderBy(offices, ['wing', 'floor_number'], ['asc', 'asc']);
};

// * API helpers ===================

const getErrorString = err => {
  return Array.isArray(err) && err.length ? err[0] : err ? err : '';
};

export const handleAPIErrorResponse = (response, caller) => {
  const {status, problem, data} = response;

  if (status === 200) {
    return;
  }

  if (status === 404) {
    throw `error in ${caller}: NOT FOUND`;
  }

  if (status === 500) {
    throw `error in ${caller}: SERVER ERROR`;
  }

  if (problem === 'CLIENT_ERROR') {
    Object.keys(data).map(field => {
      const reason = getErrorString(data[field]);

      throw `error in ${caller}: ${reason}`;
    });
  }
};

export const handleAPISuccessResponse = response => {
  const {status, data} = response;

  if (status !== 200) {
    return false;
  }

  if (status == 201) {
    return data;
  }

  let actualData = null;

  if (Array.isArray(data)) {
    data.map(ele => {
      if (typeof ele !== 'string') {
        actualData = ele;
      }
    });
  } else {
    Object.values(data).map(val => {
      actualData = val;
    });
  }

  return actualData;
};

export const getQueryString = query => {
  if (Object.keys(query).length < 1) {
    return '';
  }
  let str = '?';
  const Items = Object.entries(query);

  Items.map((item, i) => {
    if (i !== Items.length - 1) {
      str += item[0] + '=' + encodeURIComponent(item[1]) + '&';
    } else {
      str += item[0] + '=' + encodeURIComponent(item[1]);
    }
  });

  return str;
};

export const getInvoiceHTMLTemplate = (
  buildingDetails,
  officeDetails,
  invoiceData,
  bankDetails,
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>Document</title>
    </head>
    <body>
      <div class="container">
        <!-- header -->
        <div class="row">
          <div class="logoCont">
            <img class="logo" src="${getImageSrc(buildingDetails.logo)}" />
          </div>
          <p class="invoice">Invoice</p>
        </div>
  
        <!-- Property Details -->
        <div class="row">
          <div class="addressCont">
            <p class="buildingAddress">${buildingDetails.address}</p>
          </div>
          <div class="contactAndGSTCont">
            <p class="contactAndGSTContDetails">
              GST no. ${buildingDetails.gst}
            </p>
            <p class="contactAndGSTContDetails">${buildingDetails.mobile}</p>
            <p class="contactAndGSTContDetails">${buildingDetails.email}</p>
          </div>
        </div>
  
        <!-- hr -->
        <div class="hr"></div>
  
        <!-- billing office -->
        <div class="row">
          <div class="billToCont">
            <p class="officeName">${officeDetails.office_name}</p>
            <p numberOfLines="{2}" class="officeAddress">
              ${officeDetails.office_address}
            </p>
            <p class="officeDetailsText">GST no. ${officeDetails.gst_number}</p>
            <p class="officeDetailsText">
              +91 - ${officeDetails.contact_number}
            </p>
            <p class="officeDetailsText">${officeDetails.email_address}</p>
          </div>
          <div>
            <div class="fieldsCont">
              <p class="billingDetailsfieldHeading">Invoice Number:</p>
              <p class="textSmallSecondary">
                ${invoiceData.number}
              </p>
            </div>
            <div class="fieldsCont">
              <p class="billingDetailsfieldHeading">Invoice Date:</p>
              <p class="textSmallSecondary">  
              ${invoiceData.invoice_date}
              </p>
            </div>
            <div class="fieldsCont">
              <p class="billingDetailsfieldHeading">Due Date:</p>
              <p class="textSmallSecondary">
              ${invoiceData.invoice_due_date}
              </p>
            </div>
            <div class="fieldsCont">
              <p class="billingDetailsfieldHeading">Total Amount:</p>
              <p class="textSmallSecondary">
              ${invoiceData.total}
              </p>
            </div>
          </div>
        </div>
  
        <!-- hr -->
        <div class="hr"></div>
  
        <!-- invoice items -->
        <div class="invoiceItemsCont">
          <table>
            <thead class="tableHead">
              <tr>
                <th class="invoiceItemHeading">Description</th>
                <th class="invoiceItemHeading">Qty.</th>
                <th class="invoiceItemHeading">Rate</th>
                <th class="invoiceItemHeading">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.invoice_items.map(
                item =>
                  `<tr>
                  <td class="invoiceItemHeading">
                    ${item.desc}
                  </td>
                  <td class="invoiceItemHeading">${item.qty}</td>
                  <td class="invoiceItemHeading">${item.rate}</td>
                  <td class="invoiceItemHeading">${item.total}</td>
                  </tr>`,
              )}
            </tbody>
          </table>
        </div>
  
        <!-- hr -->
        <div class="hr"></div>
  
        <!-- summary -->
        <div class="summaryCont">
          <div class="row">
            <p class="heading">Total Amount</p>
            <p class="heading">₹ 0</p>
          </div>
          <div class="summaryBankDetails">
            <p class="billingDetailsfieldHeading">Bank Details</p>
            <div>
              <div class="fieldsCont">
                <p class="billingDetailsfieldHeading">Bank Name:</p>
                <p class="billingDetailsfieldHeading">${
                  bankDetails.bank_name
                }</p>
              </div>
              <div class="fieldsCont">
                <p class="billingDetailsfieldHeading">Account Holder:</p>
                <p class="billingDetailsfieldHeading">${
                  bankDetails.holder_name
                }</p>
              </div>
              <div class="fieldsCont">
                <p class="billingDetailsfieldHeading">Account Number:</p>
                <p class="billingDetailsfieldHeading">${bankDetails.acc_num}</p>
              </div>
              <div class="fieldsCont">
                <p class="billingDetailsfieldHeading">IFSC Code:</p>
                <p class="billingDetailsfieldHeading">${
                  bankDetails.ifsc_code
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <style>
        body {
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: ${lightTheme.THEME};
          width: 50%;
          margin: 10px auto;
          padding: 30px 50px;
          box-shadow: 2px 2px 5px 6px rgb(181, 198, 216);
        }
        .row {
          margin-bottom: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logoCont {
          width: 25%;
          height: 30;
        }
        .logo {
          width: 100%;
          height: 100%;
        }
        .invoice {
          color: ${fonts.fontColor.text};
          font-family: "${fonts.family.familyName}";
          font-size: 20px;
        }
        .addressCont {
          width: 50%;
        }
        .buildingAddress {
          font-family: "${fonts.family.familyName}";
          font-size: 16px;
          color: ${fonts.fontColor.dark};
        }
        .contactAndGSTCont {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .contactAndGSTContDetails {
          font-family: "${fonts.family.familyName}";
          font-size: 10px;
          color: ${fonts.fontColor.dark};
        }
        .hr {
          width: 100%;
          height: 1px;
          background-color: blue;
          background-color: ${lightTheme.SECONDARY_TEXT};
        }
        .billToCont {
          width: 45%;
        }
        .officeName {
          font-family: "${fonts.family.familyName}";
          font-weight: 700;
          font-size: 16px;
          color: ${fonts.fontColor.dark};
        }
  
        .officeAddress {
          font-family: "${fonts.family.familyName}";
          font-size: ${fonts.fontSize.small}px;
          color: ${fonts.fontColor.dark};
        }
  
        .officeDetailsText {
          font-family: "${fonts.family.familyName}";
          font-size: ${fonts.fontSize.small}px;
          color: ${fonts.fontColor.dark};
          marginTop: 5,
        }
        .fieldsCont {
          display: flex;
          align-items: center;
          margin-left: 10px;
          margin-bottom: 5px;
          justify-content: space-between;
        }
        .billingDetailsfieldHeading {
          font-family: "${fonts.family.familyName}";
          font-size: 14px;
          color: ${fonts.fontColor.dark};
        }
        .textSmallSecondary {
          color: ${fonts.fontColor.grey};
          font-family: "${fonts.family.familyName}";
          font-size: ${fonts.fontSize.small}px;
          margin-left: 10px;
        }
  
        .invoiceItemsCont {
          margin: 10px 0;
        }
  
        .invoiceItemHeader {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid #666;
          padding-bottom: 5px;
        }
        .invoiceItems {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-bottom: 5px;
        }
        .invoiceItemHeading {
          font-family: "${fonts.family.familyName}";
          font-weight: 700;
          font-size: ${fonts.fontSize.small}px;
          color: ${fonts.fontColor.dark};
          max-width: 100px;
        }
        table,
        tbody {
          width: 100%;
          border: 0;
        }
        th {
          border-bottom: 1px solid #666;
          border-collapse: collapse;
        }
        td {
          text-align: center;
          margin-top: 10px;
        }
  
        tbody tr td:nth-child(1) {
          text-align: start;
        }
  
        .summaryCont {
          margin: 10px;
        }
        .heading {
          color: ${fonts.fontColor.dark};
          font-family: "${fonts.family.familyName}";
          font-weight: 400;
          font-size: ${fonts.fontSize.semiLarge}px;
        }
  
        .summaryBankDetails {
          margin: 10px 0;
        }
  
        .fieldsCont {
          display: flex;
          align-items: center;
          margin-left: 10px;
          margin-bottom: 5px;
          justify-content: space-between;
        }
      </style>
    </body>
  </html>
  
  
  
  `;
};

// !testing

// console.log(
//   getInvoiceHTMLTemplate(
//     {
//       logo: require('../../assets/images/placeholders/imgpsh.png'),
//       address: '816, shekher center, palasia Square, Indore, India 452018',
//       gst: '22AAAAA0000A10J2H',
//       mobile: '+91-9990581540',
//       email: 'invoice@goinvoicy.com',
//     },
//     {
//       office_name: 'Codervita',
//       office_address: '101, Shekher Center, A.B. Road, Indore, (M.P.) 452018',
//       gst_number: '22AAAAA0000A10J2H',
//       contact_number: '+91-9990581540',
//       email_address: 'invoice@goinvoicy.com',
//     },
//     {
//       number: 'J-003',
//       invoice_date: '05 Jan 2022',
//       invoice_due_date: '05 Jan 2022',
//       total: '₹ 60,000',
//       invoice_items: [
//         {
//           desc: 'Rent for December Office no. 101',
//           qty: '1',
//           rate: '60,000',
//           total: '60,000',
//         },
//       ],
//     },
//     {
//       bank_name: 'BOI',
//       holder_name: 'Shekhar Center',
//       acc_num: '8814400001367',
//       ifsc_code: 'BOI1405076',
//     },
//   ),
// );
