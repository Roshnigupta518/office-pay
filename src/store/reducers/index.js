import {combineReducers} from 'redux';

import Auth from './Auth';
import Building from './Building';
import Intro from './Intro';

export default combineReducers({
  auth: Auth,
  buildingDetails: Building,
  introComplete: Intro,
});
