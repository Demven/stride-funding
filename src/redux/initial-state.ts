import { getAccountInitialState } from './reducers/account';
import { getInstitutionsInitialState } from './reducers/institutions';
import { getUIInitialState } from './reducers/ui';
import { State } from './reducers';

export const initialState:State = {
  account: getAccountInitialState(),
  institutions: getInstitutionsInitialState(),
  ui: getUIInitialState(),
};
