import { Outlet } from 'react-router-dom';
import SidebarWithHeader from '../components/Navigation';

const Root = () => {
  return <SidebarWithHeader children={<Outlet />} />;
};

export default Root;
