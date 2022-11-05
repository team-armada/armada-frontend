import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: React.ReactNode;
};

// TODO: Make adjustments to check role and get current username.
const StudentPrivateRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { isAdmin, isAuthenticated, username } = useAuth();
  //   return (isAuthenticated && isAdmin) ||
  //     (isAuthenticated && location.pathname.includes(username)) ? (
  //     <>{children}</>
  //   ) : (
  //     <Navigate to="/login" />
  //   );
  return <>{children}</>;
};

export default StudentPrivateRoute;
