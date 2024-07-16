import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute = ({ redirectPath = '/sign-in' }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
