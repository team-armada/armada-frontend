import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import SidebarWithHeader from '../components/Naviagtion';

const Root = () => {
  return (
    <>
      <SidebarWithHeader children={<Outlet />}/>
    </>
  );
};

export default Root;
