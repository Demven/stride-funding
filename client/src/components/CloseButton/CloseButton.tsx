import React from 'react';
import classNames from 'classnames';
import './CloseButton.scss';

interface ButtonProps {
  className?: string;
  scaleOnHover?: boolean;
  onClick?: (event: any) => void;
}

export default function CloseButton (props:ButtonProps) {
  const {
    className,
    scaleOnHover = false,
    onClick = () => {},
  } = props;

  return (
    <button
      className={classNames('CloseButton', className, {
        'CloseButton--scale-on-hover': scaleOnHover,
      })}
      onClick={onClick}
    />
  );
}
