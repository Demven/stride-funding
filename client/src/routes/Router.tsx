import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SignInPage from '../pages/SignInPage/SignInPage';
import InstitutionsPage from '../pages/InstitutionsPage/InstitutionsPage';
import PrivateRoute from './PrivateRoute';

export default function Router () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/sign-in'>
          <SignInPage />
        </Route>

        <PrivateRoute path='/institutions'>
          <InstitutionsPage />
        </PrivateRoute>

        <PrivateRoute path='/saved'>
          <InstitutionsPage showSaved />
        </PrivateRoute>

        <PrivateRoute path='/'>
          <Redirect to='/institutions' />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
