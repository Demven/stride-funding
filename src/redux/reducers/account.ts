import {
  SET_ACCOUNT,
} from '../actions/account';
import * as clientStorage from '../../services/client-storage';
import { StorageKey } from '../../services/client-storage';
import Account from '../../types/Account';

const localAccount = clientStorage.get(StorageKey.ACCOUNT);

const INITIAL_STATE:Account = {
  name: localAccount?.name || undefined,
  email: localAccount?.email || undefined,
  token: localAccount?.token || undefined,
};

export function getAccountInitialState () {
  return INITIAL_STATE;
}

export default function accountReducer (state:Account = INITIAL_STATE, action?:any) {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.account === null
        ? {
          name: undefined,
          email: undefined,
          token: undefined,
        } as Account
        : { ...action.account } as Account;
    default:
      return state;
  }
};
