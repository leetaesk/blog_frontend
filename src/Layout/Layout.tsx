import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';
import ThemeToggleButton from '@/Layout/components/ThemeToggleButton';
import BounceLoader from '@/components/BounceLoader';
import useScrollToTop from '@/hooks/useScrollToTop';
import useThemeStore from '@/store/themeStore';
import useUiStore from '@/store/useUiStore';

const Layout = () => {
  const location = useLocation();
  useScrollToTop(location);

  const {} = useThemeStore();
  const { isGlobalLoading } = useUiStore();

  return (
    <>
      {/* // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 */}
      {/* 정렬(max-w-7xl mx-auto) */}
      <div
        className={clsx(
          'mx-auto flex min-h-screen w-full justify-center pt-32',
          location.pathname !== '/' && 'max-w-7xl px-6 md:px-12',
        )}
      >
        {isGlobalLoading && <BounceLoader />}
        <Navbar />
        <Outlet />
      </div>
      <footer className="text-muted-foreground border-border grid grid-cols-3 border-t px-6 py-8 text-center md:px-12">
        <div>
          <ThemeToggleButton />
        </div>
        <p>© {new Date().getFullYear()} Taeseok Lee. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
