import React from 'react';
import classNames from 'classnames';
import Institution from '../../../../types/Institution';
import './InstitutionDetails.scss';

interface InstitutionDetailsProps {
  className?: string;
  selectedInstitution: Institution|undefined;
}

export default function InstitutionDetails (props:InstitutionDetailsProps) {
  const {
    className,
    selectedInstitution,
  } = props;

  return (
    <div className={classNames('InstitutionDetails', className, {
      'InstitutionDetails--empty': !selectedInstitution?.name,
    })}>
      {selectedInstitution && (
        <ul>
          <li><b>ID:</b> {selectedInstitution.institutionId}</li>
          <li><b>Type:</b> {selectedInstitution.institutionType}</li>
          <li><b>Name:</b> {selectedInstitution.name}</li>
          <li><b>City:</b> {selectedInstitution.city}</li>
          <li><b>State:</b> {selectedInstitution.state}</li>
          <li><b>Zip Code:</b> {selectedInstitution.zip}</li>
          <li><b>Zip Code:</b> {selectedInstitution.zip}</li>
          <li><b>CIP:</b> {selectedInstitution.cipCode}</li>
          <li><b>CIP Name:</b> {selectedInstitution.cipName}</li>
          <li><b>Credential Level:</b> {selectedInstitution.credentialLevel}</li>
          <li><b>Annual Rate:</b> {selectedInstitution.annualRate}</li>
          <li><b>Annual Rate Numerator:</b> {selectedInstitution.annualRateNumerator}</li>
          <li><b>Annual Rate Denominator:</b> {selectedInstitution.annualRateDenominator}</li>
          <li><b>Income Rate:</b> {selectedInstitution.incomeRate}</li>
          <li><b>Income Rate Numerator:</b> {selectedInstitution.incomeRateNumerator}</li>
          <li><b>Income Rate Denominator:</b> {selectedInstitution.incomeRateDenominator}</li>
          <li><b>Transitional Rate:</b> {selectedInstitution.transitionalRate}</li>
          <li><b>Transitional Rate Numerator:</b> {selectedInstitution.transitionalRateNumerator}</li>
          <li><b>Transitional Rate Denominator:</b> {selectedInstitution.transitionalRateDenominator}</li>
          <li><b>Transitional Discretionary Rate:</b> {selectedInstitution.transitionalDiscretionaryRate}</li>
          <li><b>Transitional Discretionary Rate Numerator:</b> {selectedInstitution.transitionalDiscretionaryRateNumerator}</li>
          <li><b>Transitional Discretionary Rate Denominator:</b> {selectedInstitution.transitionalDiscretionaryRateDenominator}</li>
          <li><b>SSA Mean Earnings:</b> {selectedInstitution.ssaMeanEarnings}</li>
          <li><b>SSA Median Earnings:</b> {selectedInstitution.ssaMedianEarnings}</li>
        </ul>
      )}
    </div>
  );
}
