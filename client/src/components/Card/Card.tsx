import React from 'react';
import classNames from 'classnames';
import './Card.scss';

interface CardProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  title: any;
  children: any;
}

export default function Card (props:CardProps) {
  const {
    className,
    headerClassName,
    contentClassName,
    title,
    children,
  } = props;

  return (
    <section className={classNames('Card', className)}>
      <div className={classNames('Card__header', headerClassName)}>
        {title}
      </div>

      <div className={classNames('Card__content', contentClassName)}>
        {children}
      </div>
    </section>
  );
}
