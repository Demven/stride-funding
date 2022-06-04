import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import Card from '../../../components/Card/Card';
import TextField, { TextFieldType } from '../../../components/TextField/TextField';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import Toast, { ToastType } from '../../../components/Toast/Toast';
import * as clientStorage from '../../../services/client-storage';
import { StorageKey } from '../../../services/client-storage';
import { signIn } from '../../../services/api';
import { setAccountAction } from '../../../redux/actions/account';
import Account from '../../../types/Account';
import './SignInForm.scss';

interface SignInFormProps {
  className?: string;
  setAccountAction: (account:Account|null) => void;
}

function SignInForm (props:SignInFormProps) {
  const {
    className,
    setAccountAction,
  } = props;
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>(ToastType.INFO);
  const [toastText, setToastText] = useState<string>('');

  function onSubmit (event:FormEvent) {
    event.preventDefault();

    setLoading(true);

    if (accountName && email) {
      signIn(accountName, email)
        .then((account:Account) => {
          if (account?.token) {
            setAccountAction(account);
            clientStorage.save(StorageKey.ACCOUNT, account);
            history.push('/');
          } else {
            showToast(ToastType.ERROR, 'Make sure that the name and email are entered correctly');
          }
        })
        .catch((error:Error) => {
          console.error(error);

          showToast(ToastType.ERROR, 'User doesn\'t exit. Make sure you\'re using the correct name and email address.');
        })
        .finally(() => setLoading(false));
    } else {
      showToast(ToastType.ERROR, 'Enter your account name');
      setLoading(false);
    }
  }

  function showToast (toastType:ToastType, toastText:string) {
    setToastType(toastType);
    setToastText(toastText);
    setToastVisible(true);
  }

  return (
    <Card
      className={classNames('SignInForm', className)}
      title={(
        <>
          Welcome! Sign In<br />
          with your name and email
        </>
      )}
    >
      <form
        className='SignInForm__form'
        onSubmit={onSubmit}
      >
        <Loader loading={loading} />

        <div className='SignInForm__fields'>
          <TextField
            className='SignInForm__input'
            name='accountName'
            value={accountName}
            placeholder='User Name'
            onChange={setAccountName}
          />

          <TextField
            className='SignInForm__input'
            type={TextFieldType.EMAIL}
            name='email'
            value={email}
            placeholder='Email'
            onChange={setEmail}
          />
        </div>

        <Button
          className='SignInForm__button'
          type='submit'
          disabled={!accountName?.length || !email?.length}
        >
          Sign In
        </Button>
      </form>

      <Toast
        visible={toastVisible}
        type={toastType}
        text={toastText}
        onHide={() => setToastVisible(false)}
      />
    </Card>
  );
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      setAccountAction,
    },
    dispatch
  )
};

export default connect(
  null,
  mapDispatchToProps,
)(SignInForm);
