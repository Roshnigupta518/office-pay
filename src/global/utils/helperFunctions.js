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
    : {[property]: null};
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

// * office listing ===================

export const sortOfficeDetails = offices => {
  return orderBy(offices, ['wing', 'floor_number'], ['asc', 'asc']);
};
