import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navigation from '../components/Naviagtion';

const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
