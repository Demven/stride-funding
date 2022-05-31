import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import Page from '../../components/Page/Page';
import InstitutionsListCard from './InstitutionsListCard/InstitutionsListCard';
import InstitutionCard from './InstitutionCard/InstitutionCard';
import { State } from '../../redux/reducers';
import { fetchInstitutions, fetchSavedInstitutions } from '../../redux/dispatchers/institutions';
import { setShowSavedAction } from '../../redux/actions/ui';
import Institution from '../../types/Institution';
import './InstitutionsPage.scss';

interface InstitutionsPageProps {
  showSaved?: boolean;
  institutions?: Institution[];
  savedInstitutions?: Institution[];
  fetchInstitutions: () => void;
  fetchSavedInstitutions: () => void;
  setShowSavedAction: (showSaved:boolean) => void;
}

function InstitutionsPage (props:InstitutionsPageProps) {
  const {
    showSaved = false,
    institutions,
    savedInstitutions,
    fetchInstitutions,
    fetchSavedInstitutions,
    setShowSavedAction,
  } = props;
  const history = useHistory();

  const [selectedInstitution, setSelectedInstitution] = useState<Institution|undefined>();

  useEffect(() => {
    fetchInstitutions();
    fetchSavedInstitutions();
  }, []);

  useEffect(() => {
    if (showSaved) {
      setShowSavedAction(true);
    } else {
      setShowSavedAction(false);
    }
  }, [showSaved]);

  useEffect(() => {
    if (!showSaved && institutions?.length) {
      setSelectedInstitution(institutions?.[0]);
    }
  }, [
    showSaved,
    institutions?.length,
  ]);

  useEffect(() => {
    if (showSaved) {
      if (savedInstitutions?.length) {
        setSelectedInstitution(savedInstitutions?.[0]);
      } else {
        history.push('/institutions');
      }
    }
  }, [
    showSaved,
    savedInstitutions?.length,
  ]);

  return (
    <Page
      title='Institutions'
      withHeader
    >
      <main className='InstitutionsPage'>
        <div className='InstitutionsPage__sidebar'>
          <InstitutionsListCard
            className='InstitutionsPage__sidebar-card'
            selectedInstitution={selectedInstitution}
            onSelectInstitution={setSelectedInstitution}
          />
        </div>

        <div className='InstitutionsPage__main-content'>
          <InstitutionCard selectedInstitution={selectedInstitution} />
        </div>
      </main>
    </Page>
  );
}

const mapStateToProps = (state:State) => {
  return {
    institutions: state.institutions.institutions,
    savedInstitutions: state.institutions.savedInstitutions,
  };
};

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      fetchInstitutions,
      fetchSavedInstitutions,
      setShowSavedAction,
    },
    dispatch
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionsPage);
