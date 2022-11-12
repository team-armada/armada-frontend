import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: React.ReactNode;
};

const AdminPrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAdmin, isAuthenticated } = useAuth();

  return isAuthenticated && isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminPrivateRoute;
