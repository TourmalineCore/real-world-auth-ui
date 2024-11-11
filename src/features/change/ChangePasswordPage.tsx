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

function ChangePasswordPage() {
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
  const passwordResetToken = searchParams.get('passwordResetToken');

  return (
    <div className="background-img-page change-password-page">
      <LoginForm
        onSubmit={handleFormSubmit}
        buttonText="Done"
        buttonDisabled={isValid}
        title="Change Password"
        subtitle="Create new password for"
        login={login}
      >
        <div className="change-password-page__inner">
          <InputPassword
            id="password"
            label="Create password"
            className="change-password-page__input"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            onFocus={() => setIsTooltip(true)}
            onBlur={() => setIsTooltip(false)}
            autoComplete="off"
          />

          {(isTooltip || password) && isValid && (
            <Tooltip className="change-password-page__tooltip">
              <ul className="change-password-page__required-list">
                <li className={clsx('change-password-page__validation-item', { 'change-password-page__validation-item--valid': minLenght })}>
                  <span className="change-password-page__checkbox">
                    {minLenght && <span className="change-password-page__checkmark" />}
                  </span>
                  <span>Minimum of 8 characters</span>
                </li>
                <li className={clsx('change-password-page__validation-item', { 'change-password-page__validation-item--valid': isContainsUppercaseLetter })}>
                  <span className="change-password-page__checkbox">
                    {isContainsUppercaseLetter && <span className="change-password-page__checkmark" />}
                  </span>
                  <span>Contains an uppercase letter</span>
                </li>
                <li className={clsx('change-password-page__validation-item', { 'change-password-page__validation-item--valid': isContainsLowercaseLetter })}>
                  <span className="change-password-page__checkbox">
                    {isContainsLowercaseLetter && <span className="change-password-page__checkmark" />}
                  </span>
                  <span>Contains an lowercase letter</span>
                </li>
                <li className={clsx('change-password-page__validation-item', { 'change-password-page__validation-item--valid': isContainsNumber })}>
                  <span className="change-password-page__checkbox">
                    {isContainsNumber && <span className="change-password-page__checkmark" />}
                  </span>
                  <span>Contains a number (0-9)</span>
                </li>
                <li className={clsx('change-password-page__validation-item', { 'change-password-page__validation-item--valid': isContainsSpecialCharacters })}>
                  <span className="change-password-page__checkbox">
                    {isContainsSpecialCharacters && <span className="change-password-page__checkmark" />}
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
        await api.put('/auth/change-password', {
          login,
          passwordResetToken,
          newPassword: password,
        });

        await setLogin({ login, password });
      } catch (e) {
        setPassword('');
      }
    }
  }
}

export default ChangePasswordPage;
