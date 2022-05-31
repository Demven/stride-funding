import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators, Dispatch } from 'redux';
import throttle from 'lodash/throttle';
import Loader from '../../../components/Loader/Loader';
import Card from '../../../components/Card/Card';
import InstitutionsList from './InstitutionsList/InstitutionsList';
import TextField from '../../../components/TextField/TextField';
import IconButton from '../../../components/IconButton/IconButton';
import { State } from '../../../redux/reducers';
import { fetchInstitutions } from '../../../redux/dispatchers/institutions';
import Institution from '../../../types/Institution';
import InstitutionFilters from '../../../types/InstitutionFilters';
import './InstitutionsListCard.scss';

interface InstitutionsListCardProps {
  className?: string;
  showSaved?: boolean;
  institutionsLoading: boolean;
  selectedInstitution: Institution|undefined;
  onSelectInstitution: (institution:Institution) => void;
  fetchInstitutions: (filters?:InstitutionFilters) => void;
}

function InstitutionsListCard (props:InstitutionsListCardProps) {
  const {
    className,
    showSaved,
    institutionsLoading,
    selectedInstitution,
    onSelectInstitution,
    fetchInstitutions,
  } = props;

  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string>('');
  const [filterByZipCode, setFilterByZipCode] = useState<string>('');

  const throttledFetchInstitutions = useCallback(throttle(fetchInstitutions, 1000), []);

  useEffect(() => {
    throttledFetchInstitutions({
      name: filterByName,
      zipCode: filterByZipCode,
    });
  }, [filterByName, filterByZipCode]);

  function toggleFilters () {
    if (filtersVisible) {
      setFilterByName('');
      setFilterByZipCode('');
    }

    setFiltersVisible(!filtersVisible);
  }

  return (
    <Card
      className={classNames('InstitutionsListCard', className)}
      headerClassName='InstitutionsListCard__header'
      contentClassName='InstitutionsListCard__content'
      title={(
        <>
          <div className='InstitutionsListCard__title-container'>
            <div className='InstitutionsListCard__title'>
              {showSaved ? 'Saved Institutions' : 'All Institutions'}
            </div>

            <IconButton
              className='InstitutionsListCard__filters-button'
              iconUrl='/icons/filters.png'
              iconAlt='Filters'
              active={filtersVisible}
              toggled={filtersVisible}
              onClick={toggleFilters}
            />
          </div>

          {filtersVisible && (
            <div className='InstitutionsListCard__filters'>
              <TextField
                className='InstitutionsListCard__filter'
                name='name'
                placeholder='Search by Name'
                value={filterByName}
                onChange={setFilterByName}
              />

              <TextField
                className='InstitutionsListCard__filter'
                name='zip'
                placeholder='Zip Code'
                value={filterByZipCode}
                onChange={setFilterByZipCode}
              />
            </div>
          )}
        </>
      )}
    >
      <Loader loading={institutionsLoading} />

      <InstitutionsList
        className='InstitutionsListCard__list'
        selectedInstitution={selectedInstitution}
        onSelectInstitution={onSelectInstitution}
      />
    </Card>
  );
}

const mapStateToProps = (state:State) => {
  return {
    showSaved: state.ui.showSaved,
    institutionsLoading: state.institutions.institutionsLoading,
  };
};

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      fetchInstitutions,
    },
    dispatch
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionsListCard);
