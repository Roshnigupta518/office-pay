import {types} from '../actionTypes';

const {LOGIN_USER} = types;

const INITIAL_STATE = {
  userLogin: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLogin: true,
        buildingOwner: action.buildingOwner,
      };
    default:
      return state;
  }
};

export default reducer;
