import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Card from '../../../components/Card/Card';
import IconButton from '../../../components/IconButton/IconButton';
import Loader from '../../../components/Loader/Loader';
import Toast, { ToastType } from '../../../components/Toast/Toast';
import InstitutionDetails from './InstitutionDetails/InstitutionDetails';
import { State } from '../../../redux/reducers';
import { fetchSavedInstitutions } from '../../../redux/dispatchers/institutions';
import * as api from '../../../services/api';
import Institution from '../../../types/Institution';
import './InstitutionCard.scss';
import RateLabel from "../../../components/RateLabel/RateLabel";

interface InstitutionCardProps {
  className?: string;
  selectedInstitution: Institution|undefined;
  email: string|undefined;
  institutionsLoading: boolean;
  savedInstitutions: Institution[];
  fetchSavedInstitutions: () => void;
}

function InstitutionCard (props:InstitutionCardProps) {
  const {
    className,
    selectedInstitution,
    email,
    institutionsLoading = false,
    savedInstitutions,
    fetchSavedInstitutions,
  } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>(ToastType.INFO);
  const [toastText, setToastText] = useState<string>('');

  useEffect(() => {
    if (selectedInstitution && savedInstitutions?.length) {
      const isSaved = !!savedInstitutions.find((institution:Institution) => institution.id === selectedInstitution.id);
      setSaved(isSaved);
    } else {
      setSaved(false);
    }
  }, [selectedInstitution, savedInstitutions?.length]);

  function save () {
    const uuid = selectedInstitution?.id;
    if (!email || !uuid) return;

    setLoading(true);

    api.saveInstitution(uuid, email)
      .then((success:boolean) => {
        if (success) {
          setSaved(true);
          fetchSavedInstitutions();
          showToast(ToastType.SUCCESS, 'Saved');
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => setLoading(false));
  }

  function unsave () {
    const uuid = selectedInstitution?.id;
    if (!email || !uuid) return;

    setLoading(true);

    api.unsaveInstitution(uuid, email)
      .then((success:boolean) => {
        if (success) {
          setSaved(false);
          fetchSavedInstitutions();
          showToast(ToastType.SUCCESS, 'Unsaved');
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => setLoading(false));
  }

  function showToast (toastType:ToastType, toastText:string) {
    setToastType(toastType);
    setToastText(toastText);
    setToastVisible(true);
  }

  function showErrorMessage () {
    showToast(ToastType.ERROR, 'Oops. Something went wrong. Try again or contact our Support team.');
  }

  const isEmpty = !selectedInstitution?.name;

  return (
    <Card
      className={classNames('InstitutionCard', className)}
      headerClassName='InstitutionCard__header'
      contentClassName='InstitutionCard__content'
      title={(
        <>
          <span className='InstitutionCard__title'>
            {institutionsLoading
              ? 'Loading...'
              : isEmpty ? <>&nbsp;</> : selectedInstitution?.name
            }
          </span>

          <IconButton
            className='InstitutionCard__save-button'
            iconUrl='/icons/bookmark.png'
            active={saved}
            activeIconUrl='/icons/bookmark-filled.png'
            iconAlt={saved ? 'Save' : 'Unsave'}
            disabled={!email || loading || isEmpty}
            onClick={saved ? unsave : save}
          />
        </>
      )}
    >
      <Loader loading={loading || institutionsLoading} />

      <InstitutionDetails selectedInstitution={selectedInstitution} />

      <Toast
        visible={toastVisible}
        type={toastType}
        text={toastText}
        onHide={() => setToastVisible(false)}
      />
    </Card>
  );
}

const mapStateToProps = (state:State) => {
  return {
    email: state.account.email,
    institutionsLoading: state.institutions.institutionsLoading,
    savedInstitutions: state.institutions.savedInstitutions,
  };
};

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      fetchSavedInstitutions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionCard);
