import React from 'react';
import classNames from 'classnames';
import './RateLabel.scss';

interface RateLabelProps {
  className?: string;
  annualRate?: number;
}

export default function RateLabel (props:RateLabelProps) {
  const {
    className,
    annualRate,
  } = props;

  if (!annualRate) return null;

  const passing = annualRate <= 8;
  const zone = annualRate > 8 && annualRate < 12;
  const failing = annualRate >= 12;

  return (
    <div
      className={classNames('RateLabel', className, {
        'RateLabel--passing': passing,
        'RateLabel--zone': zone,
        'RateLabel--failing': failing,
      })}
    >
      {passing
        ? 'Recommended'
        : zone ? 'Good' : 'Not Recommended'
      }
    </div>
  );
}
