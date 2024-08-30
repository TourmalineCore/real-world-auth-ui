import { FormEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import logo from '../../assets/img/icon-tc-logo.svg';
import arrow from '../../assets/img/icon-arrow-left-colored.svg';

import Button from '../Button/Button';

function LoginForm({
  children,
  errorMessage,
  onSubmit = () => {},
  buttonText = 'Log In',
  buttonDisabled = true,
  title,
  subtitle,
  login = '',
  className,
  backPath = '',
}: {
  children: ReactNode;
  errorMessage?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  buttonText?: string;
  buttonDisabled?: boolean;
  title?: string;
  subtitle?: string;
  login?: string | null;
  className?:string;
  backPath?: string;
}) {
  return (
    <div className={clsx('login-form login-form--create', className)}>
      <div className={clsx('login-form__inner', {
        'login-form__inner--back-link': backPath,
      })}
      >

        {backPath && (
          <Link to={backPath} className="login-form__back-link ">
            <img src={arrow} alt="Link back to auth page" />
          </Link>
        )}

        <img className="login-form__logo" src={logo} alt="Tourmaline Core Logo" />

        <h1 className="login-form__title">{title}</h1>
        <h2 className="login-form__subtitle">
          {subtitle}
          {login && (<span className="login-form__login">{login}</span>)}
        </h2>

        <form className="login-form__form" onSubmit={onSubmit}>
          {children}
          <div className={clsx('login-form__submit-btn-wrapper')}>
            <Button
              type="submit"
              disabled={buttonDisabled}
              className="login-form__submit-btn"
            >
              {buttonText}
            </Button>
          </div>
        </form>
        <div className="login-form__messages-box">
          {errorMessage && (
            <span>
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
