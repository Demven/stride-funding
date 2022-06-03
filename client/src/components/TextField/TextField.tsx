import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import './TextField.scss';

interface TextFieldProps {
  className?: string;
  type?: TextFieldType;
  name: string;
  value: string|number;
  step?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (value:string) => void;
}

export enum TextFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
}

export default function TextField (props:TextFieldProps) {
  const {
    className,
    type = TextFieldType.TEXT,
    name,
    value,
    step = '0.01',
    min,
    max,
    placeholder,
    autoFocus = false,
    onChange,
  } = props;

  const [focused, setFocused] = useState<boolean>(false);

  const id = name.toLowerCase();

  return (
    <div className={classNames('TextField', className)}>
      {(placeholder && focused) && (
        <label
          className='TextField__label'
          htmlFor={id}
        >
          {placeholder}
        </label>
      )}

      <input
        id={id}
        className='TextField__input'
        autoFocus={autoFocus}
        type={type}
        value={value}
        min={min}
        max={max}
        placeholder={focused ? undefined : placeholder}
        step={type === TextFieldType.NUMBER ? step : undefined}
        onChange={(event:ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
