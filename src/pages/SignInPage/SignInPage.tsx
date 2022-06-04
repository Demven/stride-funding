import React from 'react';
import Page from '../../components/Page/Page';
import SignInForm from './SignInForm/SignInForm';
import './SignInPage.scss';

export default function SignInPage () {
  return (
    <Page title='Sign In'>
      <div className='SignInPage'>
        <img
          className='SignInPage__logo'
          src='/images/logo.png'
          alt='Stride Funding'
        />

        <SignInForm className='SignInPage__form' />
      </div>
    </Page>
  );
}
