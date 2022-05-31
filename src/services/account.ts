import Account from '../types/Account';

export function isSignedIn (account:Account|null) {
  return !!account?.token;
}
