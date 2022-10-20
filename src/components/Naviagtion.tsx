import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <Link to="/" className="navigation-link">
          Home
        </Link>
        <Link to="/images" className="navigation-link">
          Images
        </Link>
        <Link to="/users" className="navigation-link">
          Users
        </Link>
        <Link to="/settings" className="navigation-link">
          Settings
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
