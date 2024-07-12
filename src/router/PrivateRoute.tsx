import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute = ({
  isAuthenticated,
  redirectPath = '/sign-in',
}: PrivateRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
