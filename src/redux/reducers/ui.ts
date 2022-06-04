import {
  SET_SHOW_SAVED,
} from '../actions/ui';

export interface UIState {
  showSaved: boolean;
}

const INITIAL_STATE:UIState = {
  showSaved: false,
};

export function getUIInitialState () {
  return INITIAL_STATE;
}

export default function uiReducer (state = INITIAL_STATE, action?:any) {
  switch (action.type) {
    case SET_SHOW_SAVED:
      return {
        ...state,
        showSaved: action.showSaved,
      };
    default:
      return state;
  }
};
