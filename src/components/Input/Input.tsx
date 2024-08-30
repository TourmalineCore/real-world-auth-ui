import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  type: 'text' | 'number';
  iconSrc?: string;
}

function Input({
  id,
  label,
  className,
  type,
  iconSrc,
  ...props
}: InputProps) {
  return (
    <div className={clsx('input', className)}>
      <label htmlFor={id} className="input__label">{label}</label>
      <div className="input__inner">
        {iconSrc && <img className="input__icon" src={iconSrc} alt="Input Icon" />}
        <input
          id={id}
          type={type}
          className="input__control "
          {...props}
        />
      </div>

    </div>
  );
}

export default Input;
