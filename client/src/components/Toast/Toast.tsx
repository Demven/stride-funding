import React, { useEffect } from 'react';
import classNames from 'classnames';
import CloseButton from '../CloseButton/CloseButton';
import './Toast.scss';

interface ToastProps {
  type?: ToastType;
  text: string;
  visible: boolean;
  onHide: () => void;
}

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

const TOAST_TIMEOUT = 30000; // ms

export default function Toast (props:ToastProps) {
  const {
    type = ToastType.INFO,
    text,
    visible,
    onHide,
  } = props;

  useEffect(() => {
    if (visible) {
      setTimeout(onHide, TOAST_TIMEOUT);
    }
  }, [visible]);

  return (
    <div
      className={classNames('Toast', `Toast--${type}`, {
        'Toast--visible': visible,
      })}
    >
      {text}

      <CloseButton
        className='Toast__close-button'
        scaleOnHover
        onClick={onHide}
      />
    </div>
  );
}
