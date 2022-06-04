import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../redux/reducers';
import { setAccountAction } from '../../redux/actions/account';
import * as clientStorage from '../../services/client-storage';
import Account from '../../types/Account';
import './Header.scss';

interface HeaderProps {
  className?: string;
  accountName?: string;
  savedInstitutionsCount: number;
  savedInstitutionsLoaded: boolean;
  setAccountAction: (account:Account|null) => void;
}

function Header (props:HeaderProps) {
  const {
    className,
    accountName,
    savedInstitutionsCount = 0,
    savedInstitutionsLoaded = false,
    setAccountAction,
  } = props;
  const history = useHistory();

  function onSignOut () {
    setAccountAction(null);

    clientStorage.clearAll();

    history.push('/sign-in');
  }

  const showNav = savedInstitutionsLoaded && !!savedInstitutionsCount;

  return (
    <header className={classNames('Header', className)}>
      <div className='Header__max-width-container'>
        <NavLink
          className='Header__logo-link'
          to='/'
        >
          <img
            className='Header__logo'
            src='/images/logo.png'
            alt='Stride Funding'
          />
        </NavLink>

        {showNav && (
          <nav className='Header__links'>
            <NavLink
              className='Header__link'
              activeClassName='Header__link--active'
              to='/institutions'
            >
              Institutions
            </NavLink>

            <div className='Header__links-slash' />

            <NavLink
              className='Header__link'
              activeClassName='Header__link--active'
              to='/saved'
            >
              Saved ({savedInstitutionsCount})
            </NavLink>
          </nav>
        )}

        <div className='Header__account-wrapper'>
          <img
            className='Header__account-icon'
            src='/icons/account.png'
            alt='Status:'
          />

          <div className='Header__account-name'>{accountName}</div>

          <button
            className='Header__sign-out'
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state:State) => {
  return {
    accountName: state.account?.name,
    savedInstitutionsCount: state.institutions?.savedInstitutions?.length,
    savedInstitutionsLoaded: state.institutions?.savedInstitutionsLoaded,
  };
};

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      setAccountAction,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
