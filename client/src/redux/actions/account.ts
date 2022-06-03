import Account from '../../types/Account';

export const SET_ACCOUNT = 'account/SET_ACCOUNT';

export function setAccountAction (account:Account|null) {
  return {
    type: SET_ACCOUNT,
    account,
  };
}
