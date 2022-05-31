import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { State } from '../../../../redux/reducers';
import Institution from '../../../../types/Institution';
import './InstitutionsList.scss';

interface InstitutionsListProps {
  className?: string;
  showSaved: boolean;
  institutions?: Institution[];
  savedInstitutions?: Institution[];
  selectedInstitution: Institution|undefined;
  onSelectInstitution: (institution:Institution) => void;
}

function InstitutionsList (props:InstitutionsListProps) {
  const {
    className,
    showSaved,
    institutions,
    savedInstitutions,
    selectedInstitution,
    onSelectInstitution,
  } = props;

  const institutionsToList = (showSaved ? savedInstitutions : institutions) || [];

  return (
    <ul
      className={classNames('InstitutionsList', className, {
        'InstitutionsList--empty': !institutionsToList?.length,
      })}
    >
      {institutionsToList.map((institution:Institution) => {
        return (
          <li
            key={institution.id}
            className={classNames('InstitutionsList__institution', {
              'InstitutionsList__institution--selected': selectedInstitution?.id === institution.id,
            })}
            onClick={() => onSelectInstitution(institution)}
          >
            <span className='InstitutionsList__name'>
              {institution.name}
            </span>

            <span className='InstitutionsList__address'>
             {institution.city}, {institution.state} {institution.zip}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state:State) => {
  return {
    showSaved: state.ui.showSaved,
    institutions: state.institutions.institutions,
    savedInstitutions: state.institutions.savedInstitutions,
  };
};

export default connect(
  mapStateToProps,
)(InstitutionsList);
