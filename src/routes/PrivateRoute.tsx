import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isSignedIn } from '../services/account';
import { State } from '../redux/reducers';
import Account from '../types/Account';

interface PrivateRouteProps {
  children: any;
  account: Account | null;
  [key: string]: unknown;
}

function PrivateRoute (props:PrivateRouteProps) {
  const {
    children,
    account,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={() => {
        return isSignedIn(account)
          ? children
          : <Redirect to='/sign-in' />;
      }}
    />
  );
}

const mapStateToProps = (state:State) => {
  return {
    account: state.account,
  };
};

export default connect(
  mapStateToProps,
)(PrivateRoute);
