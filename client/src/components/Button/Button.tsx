import React from 'react';
import classNames from 'classnames';
import './Button.scss';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit';
  children: any;
  disabled?: boolean;
  onClick?: (event: any) => void;
}

export default function Button (props:ButtonProps) {
  const {
    className,
    type = 'button',
    children,
    disabled = false,
    onClick = () => {},
  } = props;

  return (
    <button
      className={classNames('Button', className, {
        'Button--disabled': disabled,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
