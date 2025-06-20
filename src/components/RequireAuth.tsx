import type { ReactNode } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/authSlice'
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and preserve current route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;