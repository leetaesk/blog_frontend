import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';
import BounceLoader from '@/components/BounceLoader';
import useScrollToTop from '@/hooks/useScrollToTop';
import useUiStore from '@/store/useUiStore';

const Layout = () => {
  const location = useLocation();
  useScrollToTop(location);

  const { isGlobalLoading } = useUiStore();

  return (
    // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 정렬(max-w-7xl mx-auto)
    <div
      className={clsx(
        'mx-auto flex justify-center pt-32',
        location.pathname !== '/' && 'max-w-7xl px-6 md:px-12',
      )}
    >
      {isGlobalLoading && <BounceLoader />}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
