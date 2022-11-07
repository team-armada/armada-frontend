import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: React.ReactNode;
};

// Students
// - Is this user the specifc user at this url?
// Admin
// - Is this user an admin?

// TODO: Make adjustments to check role and get current username.
const AdminPrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  return isAuthenticated && isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminPrivateRoute;
