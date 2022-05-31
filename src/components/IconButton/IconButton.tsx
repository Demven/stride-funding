import React from 'react';
import classNames from 'classnames';
import './IconButton.scss';

interface IconButtonProps {
  className?: string;
  iconUrl: string;
  activeIconUrl?: string;
  iconAlt?: string;
  active?: boolean;
  disabled?: boolean;
  toggled?: boolean;
  onClick?: (event:any) => void;
}

export default function IconButton (props:IconButtonProps) {
  const {
    className,
    iconUrl,
    activeIconUrl,
    iconAlt,
    active = false,
    toggled = false,
    disabled = false,
    onClick = () => {},
  } = props;

  return (
    <button
      className={classNames('IconButton', className, {
        'IconButton--active': active,
        'IconButton--toggled': toggled,
        'IconButton--disabled': disabled,
      })}
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className='IconButton__icon'
        src={(active && activeIconUrl) ? activeIconUrl : iconUrl}
        alt={iconAlt}
      />
    </button>
  );
}
