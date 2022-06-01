import React from 'react';
import classNames from 'classnames';
import Institution from '../../../../types/Institution';
import './InstitutionDetails.scss';
import RateLabel from "../../../../components/RateLabel/RateLabel";

interface InstitutionDetailsProps {
  className?: string;
  selectedInstitution: Institution|undefined;
}

enum InstitutionDetail {
  Type = 'institutionType',
  Name = 'name',
  City = 'city',
  State = 'state',
  Zip = 'zip',
  CredentialLevel = 'credentialLevel',
  CIPName = 'cipName',
  AnnualRate = 'annualRate',
  IncomeRate = 'incomeRate',
  TransitionalRate = 'transitionalRate',
  TransitionalDiscretionaryRate = 'transitionalDiscretionaryRate',
  SSAMeanEarnings = 'ssaMeanEarnings',
  SSAMedianEarnings = 'ssaMedianEarnings',
}

const DETAILS_TO_SHOW:InstitutionDetail[] = [
  InstitutionDetail.Type,
  InstitutionDetail.Name,
  InstitutionDetail.City,
  InstitutionDetail.State,
  InstitutionDetail.Zip,
  InstitutionDetail.CredentialLevel,
  InstitutionDetail.CIPName,
  InstitutionDetail.AnnualRate,
  InstitutionDetail.IncomeRate,
  InstitutionDetail.TransitionalRate,
  InstitutionDetail.TransitionalDiscretionaryRate,
  InstitutionDetail.SSAMeanEarnings,
  InstitutionDetail.SSAMedianEarnings,
];

const DETAIL_TITLE = {
  [InstitutionDetail.Type]: 'Institution Type',
  [InstitutionDetail.Name]: 'Institution Name',
  [InstitutionDetail.City]: 'City',
  [InstitutionDetail.State]: 'State',
  [InstitutionDetail.Zip]: 'Zip',
  [InstitutionDetail.CredentialLevel]: 'Credential Level',
  [InstitutionDetail.CIPName]: 'CIP Name',
  [InstitutionDetail.AnnualRate]: 'Debt-to-Earnings Annual Rate',
  [InstitutionDetail.IncomeRate]: 'Debt-to-Earnings Discretionary Income Rate',
  [InstitutionDetail.TransitionalRate]: 'Debt-to-Earnings Transitional Rate',
  [InstitutionDetail.TransitionalDiscretionaryRate]: 'Transitional Discretionary Rate',
  [InstitutionDetail.SSAMeanEarnings]: 'Mean  Annual Earnings From SSA',
  [InstitutionDetail.SSAMedianEarnings]: 'Median Annual Earnings from SSA',
};

export default function InstitutionDetails (props:InstitutionDetailsProps) {
  const {
    className,
    selectedInstitution,
  } = props;

  return (
    <div
      className={classNames('InstitutionDetails', className, {
        'InstitutionDetails--empty': !selectedInstitution?.name,
      })}
    >
      <RateLabel
        className='InstitutionDetails__rate-label'
        annualRate={selectedInstitution?.annualRate}
      />

      {selectedInstitution && (
        <ul className='InstitutionDetails__list'>
          {DETAILS_TO_SHOW.map((detail:InstitutionDetail) => (
            <li
              key={detail}
              className='InstitutionDetails__list-item'
            >
              <b>{DETAIL_TITLE[detail]}:</b> {selectedInstitution[detail] || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
