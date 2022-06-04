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
            <div className='InstitutionsList__name-wrapper'>
              <span className='InstitutionsList__name'>
                {institution.name}
              </span>

              <span className='InstitutionsList__address'>
                {institution.city}, {institution.state} {institution.zip}
              </span>
            </div>

            <span
              className={classNames('InstitutionsList__annual-rate', {
                'InstitutionsList__annual-rate--passing': institution.annualRate <= 8,
                'InstitutionsList__annual-rate--zone': institution.annualRate > 8 && institution.annualRate < 12,
                'InstitutionsList__annual-rate--failing': institution.annualRate >= 12,
              })}
            >
             {Number(institution.annualRate)
               ? Number(institution.annualRate).toFixed(2)
               : ''
             }
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
