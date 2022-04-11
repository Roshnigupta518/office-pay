import {types} from '../actionTypes';

const {INTRO_DONE} = types;

export const IntroDone = () => {
  return {
    type: INTRO_DONE,
  };
};
