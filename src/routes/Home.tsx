import AdminPrivateRoute from '../components/PrivateRoutes/AdminPrivateRoute';

const Home = () => {
  return (
    <AdminPrivateRoute>
      <h1>Welcome to Armada</h1>
      <p>{`We'll help you get your ship together.`}</p>
    </AdminPrivateRoute>
  );
};

export default Home;
