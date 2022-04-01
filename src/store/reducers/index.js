import {combineReducers} from 'redux';

import Auth from './Auth';
import Building from './Building';

export default combineReducers({
  auth: Auth,
  buildingDetails: Building,
});
