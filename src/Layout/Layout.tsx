import { Outlet } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';

const Layout = () => {
  return (
    // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 정렬(max-w-7xl mx-auto)
    <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
