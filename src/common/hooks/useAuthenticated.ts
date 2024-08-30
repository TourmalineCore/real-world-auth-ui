import { useContext, useEffect } from 'react';
import { authService } from '../authService';

export const useAuthenticated = () => {
  // @ts-ignore
  const [isAuthenticated] = useContext(authService.AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/to-dos';
    }
  }, [isAuthenticated]);
};
