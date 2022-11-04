import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import Home from '../routes/Home';

type Props = {
    children?: React.ReactNode;
};

// Students
// - Is this user the specifc user at this url?
// Admin
// - Is this user an admin?

// TODO: Make adjustments to check role and get current username.
const StudentPrivateRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default StudentPrivateRoute;