import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <h1 style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
        Armada
      </h1>
      <nav className="navigation">
        <ul>
          <Link to="/" className="navigation-link">
            Home
          </Link>
          <Link to="/templates" className="navigation-link">
            Templates
          </Link>
          <Link to="/workspaces" className="navigation-link">
            Workspaces
          </Link>
          <Link to="/cohorts" className="navigation-link">
            Cohorts
          </Link>
          <Link to="/users" className="navigation-link">
            Users
          </Link>
          <Link to="/images" className="navigation-link">
            Images
          </Link>
          <Link to="/settings" className="navigation-link">
            Settings
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
