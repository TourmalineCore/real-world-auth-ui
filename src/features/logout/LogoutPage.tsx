import { useEffect } from 'react';

import { authService } from '../../common/authService';

function LogoutPage() {
  useEffect(() => {
    authService.setLoggedOut();

    window.location.href = '/auth';
  }, []);

  return (
    <div>You are now logged out</div>
  );
}

export default LogoutPage;
