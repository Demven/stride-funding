import React, { useEffect } from 'react';
import classNames from 'classnames';
import Header from '../Header/Header';
import { updatePageTitle } from '../../services/page-title';
import './Page.scss';

interface PageProps {
  className?: string;
  title?: string;
  withHeader?: boolean;
  children: any;
}

export default function Page (props:PageProps) {
  const {
    className,
    title,
    withHeader = false,
    children,
  } = props;

  useEffect(() => {
    updatePageTitle(title);
  }, [title]);

  return (
    <div className={classNames('Page', className)}>
      {withHeader && (
        <Header />
      )}

      {children}
    </div>
  );
}
