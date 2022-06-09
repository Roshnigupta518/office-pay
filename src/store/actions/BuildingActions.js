import {addBuilding} from '../../API/Building';
import {types} from '../actionTypes';

const {ADD_BUILDING_DETAILS} = types;

// * middleware
export const addBuidlingDetails = (buildingData, token) => {
  return async dispatch => {
    // calling API
    const buildingResp = await addBuilding(buildingData, token);

    dispatch({
      type: ADD_BUILDING_DETAILS,
      buildingData: buildingResp,
    });
  };
};
