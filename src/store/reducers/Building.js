import {types} from '../actionTypes';

const {ADD_BUILDING_DETAILS} = types;

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BUILDING_DETAILS:
      return action.buildingData;
    default:
      return state;
  }
};

export default reducer;
