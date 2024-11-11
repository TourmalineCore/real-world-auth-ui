import {
  useState, ChangeEvent, FormEvent,
} from 'react';

// import { Link } from 'react-router-dom';
import { setLogin } from '../../common/authService';
import { useAuthenticated } from '../../common/hooks/useAuthenticated';
import loginIcon from '../../assets/img/icon-login.svg';
import logo from '../../assets/img/icon-tc-logo.svg';

import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import Button from '../../components/Button/Button';

function AuthPage() {
  useAuthenticated();

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="background-img-page auth-page">

      <div className="auth-page__wrapper">
        <div className="auth-page__inner">
          <img className="auth-page__logo" src={logo} alt="Tourmaline Core Logo" />

          <h1 className="auth-page__title">Welcome back</h1>
          <h2 className="auth-page__subtitle">Sign in to your account</h2>

          <form className="auth-page__form" onSubmit={handleFormSubmit}>
            <Input
              id="login"
              className="auth-page__input"
              type="text"
              label="Login"
              iconSrc={loginIcon}
              value={formData.login}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, login: event.target.value })}
            />
            <InputPassword
              id="password"
              className="auth-page__input"
              label="Password"
              value={formData.password}
              placeholder="8+ characters"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: event.target.value })}
            />

            {/* <Link to="/auth/reset" className="auth-page__forget-link">Forgot password?</Link> */}

            <div className="auth-page__button-box">
              <Button
                type="submit"
                className="auth-page__button"
                disabled={!formData.login || !formData.password}
              >
                Log In
              </Button>
            </div>
          </form>
          <div className="auth-page__result-message">
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    const {
      login,
      password,
    } = formData;

    event.preventDefault();

    if (login && password) {
      try {
        await setLogin({ login, password });
      } catch (e) {
        setErrorMessage('Error: Invalid login or password. Check the correctness of the entered data.');

        setFormData({ ...formData, password: '' });
      }
    }
  }
}

export default AuthPage;
