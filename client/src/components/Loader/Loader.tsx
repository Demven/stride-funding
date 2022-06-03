import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Loader.scss';

interface LoaderProps {
  className?: string;
  loading: boolean;
}

const LOADER_DELAY_MS = 1000;

export default function Loader (props:LoaderProps) {
  const {
    className,
    loading,
  } = props;

  const [startTimestamp, setStartTimestamp] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (loading && !visible) {
      setStartTimestamp(Date.now());
      setVisible(true);
    } else if (!loading && visible) {
      const currentTimestamp = Date.now();
      const visibleTimeMs = currentTimestamp - startTimestamp;

      if (visibleTimeMs > LOADER_DELAY_MS) {
        setVisible(false);
      } else {
        setTimeout(() => {
          setVisible(false);
        }, LOADER_DELAY_MS - visibleTimeMs)
      }
    }
  }, [loading, visible, startTimestamp]);

  return (
    <div
      className={classNames('Loader', className, {
        'Loader--visible': visible,
      })}
    >
      <img
        className='Loader__logo'
        src='/images/logo-small.png'
        alt='Loading...'
      />
    </div>
  );
}
