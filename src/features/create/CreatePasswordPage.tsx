import {
  useState, ChangeEvent, FormEvent,
} from 'react';

import { clsx } from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../common/api';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useValidation } from '../../common/hooks/useValidation';
import Tooltip from '../../components/Tooltip/Tooltip';

import { setLogin } from '../../common/authService';
import { useAuthenticated } from '../../common/hooks/useAuthenticated';
import InputPassword from '../../components/Input/InputPassword';

function CreatePasswordPage() {
  useAuthenticated();

  const [password, setPassword] = useState('');
  const [isTooltip, setIsTooltip] = useState(false);

  const [searchParams] = useSearchParams();

  const {
    minLenght,
    isContainsNumber,
    isContainsUppercaseLetter,
    isContainsLowercaseLetter,
    isContainsSpecialCharacters,
    isValid,
  } = useValidation(password, {
    minLenght: 8,
    isContainsNumber: true,
    isContainsUppercaseLetter: true,
    isContainsLowercaseLetter: true,
    isContainsSpecialCharacters: true,
  });

  const login = searchParams.get('login');
  const userResetPasswordToken = searchParams.get('userResetPasswordToken');

  return (
    <div className="background-img-page create-password-page">
      <LoginForm
        onSubmit={handleFormSubmit}
        buttonText="Login"
        buttonDisabled={isValid}
        title="Sign in"
        subtitle="Create a password for"
        login={login}
      >
        <div className="create-password-page__inner">
          <InputPassword
            id="password"
            type="password"
            label="Create password"
            className="create-password-page__input"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            onFocus={() => setIsTooltip(true)}
            onBlur={() => setIsTooltip(false)}
            autoComplete="off"
          />

          {(isTooltip || password) && isValid && (
            <Tooltip className="create-password-page__tooltip">
              <ul className="create-password-page__required-list">
                <li className={clsx('create-password-page__validation-item', { 'create-password-page__validation-item--valid': minLenght })}>
                  <span className="create-password-page__checkbox">
                    {minLenght && <span className="create-password-page__checkmark" />}
                  </span>
                  <span>Minimum of 8 characters</span>
                </li>
                <li className={clsx('create-password-page__validation-item', { 'create-password-page__validation-item--valid': isContainsUppercaseLetter })}>
                  <span className="create-password-page__checkbox">
                    {isContainsUppercaseLetter && <span className="create-password-page__checkmark" />}
                  </span>
                  <span>Contains an uppercase letter</span>
                </li>
                <li className={clsx('create-password-page__validation-item', { 'create-password-page__validation-item--valid': isContainsLowercaseLetter })}>
                  <span className="create-password-page__checkbox">
                    {isContainsLowercaseLetter && <span className="create-password-page__checkmark" />}
                  </span>
                  <span>Contains an lowercase letter</span>
                </li>
                <li className={clsx('create-password-page__validation-item', { 'create-password-page__validation-item--valid': isContainsNumber })}>
                  <span className="create-password-page__checkbox">
                    {isContainsNumber && <span className="create-password-page__checkmark" />}
                  </span>
                  <span>Contains a number (0-9)</span>
                </li>
                <li className={clsx('create-password-page__validation-item', { 'create-password-page__validation-item--valid': isContainsSpecialCharacters })}>
                  <span className="create-password-page__checkbox">
                    {isContainsSpecialCharacters && <span className="create-password-page__checkmark" />}
                  </span>
                  <span>Contains a special symbol</span>
                </li>
              </ul>
            </Tooltip>
          )}
        </div>

      </LoginForm>
    </div>
  );

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password) {
      try {
        await api.post('/auth/change-password', {
          login,
          userResetPasswordToken,
          password,
        });

        await setLogin({ login, password });
      } catch (e) {
        setPassword('');
      }
    }
  }
}

export default CreatePasswordPage;
