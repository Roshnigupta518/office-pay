import {addBuilding} from '../../API/Building';
import {types} from '../actionTypes';

const {ADD_BUILDING_DETAILS} = types;

// * middleware
export const addBuidlingDetails = (buildingData, token, buildingOwner) => {
  return async dispatch => {
    // calling API
    const buildingResp = await addBuilding(buildingData, token, buildingOwner);
     console.log('----------building res-------')
    dispatch({
      type: ADD_BUILDING_DETAILS,
      buildingData: buildingResp,
    });
  };
};
