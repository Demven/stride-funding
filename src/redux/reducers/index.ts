import { combineReducers } from 'redux';
import accountReducer from './account';
import institutionsReducer from './institutions';
import uiReducer from './ui';
import Account from '../../types/Account';
import { InstitutionsState } from './institutions';
import { UIState } from './ui';

export interface State {
  account: Account;
  institutions: InstitutionsState;
  ui: UIState;
}

const appReducer = combineReducers({
  account: accountReducer,
  institutions: institutionsReducer,
  ui: uiReducer,
});

export default function rootReducer (state:State|undefined, action?:any) {
  return appReducer(
    state,
    action,
  );
}
