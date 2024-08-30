import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputLoginProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  type?: 'text';
  iconSrc?: string;
}

function InputLogin({
  id,
  label,
  className,
  type = 'text',
  iconSrc,
  ...props
}: InputLoginProps) {
  return (
    <div className={clsx('input', className)}>
      <label htmlFor={id} className="input__label">{label}</label>
      <div className="input__inner">
        {iconSrc && <img className="input__icon" src={iconSrc} alt="Input Icon" />}
        <input
          id={id}
          type={type}
          className="input__control input--reset"
          {...props}
        />
      </div>
    </div>
  );
}

export default InputLogin;
