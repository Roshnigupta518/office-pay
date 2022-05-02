import orderBy from 'lodash.orderby';

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
