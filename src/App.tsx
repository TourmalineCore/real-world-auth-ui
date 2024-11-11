import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AuthPage from './features/auth/AuthPage';
import LogoutPage from './features/logout/LogoutPage';
import ResetPage from './features/reset/ResetPage';
import CreatePasswordPage from './features/create/CreatePasswordPage';
import ChangePasswordPage from './features/change/ChangePasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/logout" element={<LogoutPage />} />
        <Route path="/auth/reset" element={<ResetPage />} />
        <Route path="/auth/create-password" element={<CreatePasswordPage />} />
        <Route path="/auth/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
