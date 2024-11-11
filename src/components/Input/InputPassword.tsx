import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { ReactComponent as IconEyeClosed } from '../../assets/img/icon-eye-closed.svg';
import { ReactComponent as IconEyeOpen } from '../../assets/img/icon-eye-open.svg';
import passwordIcon from '../../assets/img/icon-password.svg';

interface InputPasswordProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
  type?: 'password';
}

function InputPassword({
  id,
  label,
  className,
  type = 'password',
  ...props
}: InputPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={clsx('input input--password', className)}>
      <label htmlFor={id} className="input__label">{label}</label>
      <div className="input__inner">
        <img className="input__icon" src={passwordIcon} alt="Password Icon" />

        <input
          id={id}
          type={isPasswordVisible ? 'text' : type}
          className="input__control"
          {...props}
        />
        <button
          className="input__action-button"
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}

        >
          {isPasswordVisible ? <IconEyeOpen /> : <IconEyeClosed />}
        </button>

      </div>
    </div>
  );
}

export default InputPassword;
