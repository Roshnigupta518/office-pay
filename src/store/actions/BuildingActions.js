import {addBuidling} from '../../API/Building';
import {types} from '../actionTypes';

const {ADD_BUILDING_DETAILS} = types;

// * middleware
export const addBuidlingDetails = async (dispatch, buildingData) => {
  // calling API
  await addBuidling(buildingData);

  dispatch({
    type: ADD_BUILDING_DETAILS,
    buildingData,
  });
};
