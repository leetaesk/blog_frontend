import { useEffect } from 'react';

import clsx from 'clsx';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';
import ThemeToggleButton from '@/Layout/components/ThemeToggleButton';
import BounceLoader from '@/components/BounceLoader';
import useScrollToTop from '@/hooks/useScrollToTop';
import useUiStore from '@/store/useUiStore';

const Layout = () => {
  const location = useLocation();
  useScrollToTop(location);

  const { isGlobalLoading, showGlobalLoading, hideGlobalLoading } = useUiStore();

  // 너 왜 여깄니??
  const navigation = useNavigation();

  useEffect(() => {
    // 내비게이션 상태가 'loading'이면 전역 로딩 상태를 true로 설정합니다.
    if (navigation.state === 'loading') {
      showGlobalLoading();
    } else {
      // 'idle' 또는 'submitting' 상태이면 로딩 상태를 false로 설정합니다.
      hideGlobalLoading();
    }
  }, [navigation.state, showGlobalLoading, hideGlobalLoading]); // 의존성 배열에 추가

  return (
    <>
      {/* 내비게이션 바 */}
      <Navbar />

      {/* // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 */}
      <main
        className={clsx(
          'mx-auto flex min-h-dvh w-[90%] justify-center pt-28 md:pt-32',
          'max-w-7xl',
        )}
      >
        {/* 로딩 중일 때 바운스로더 */}
        {isGlobalLoading && <BounceLoader />}
        <Outlet />
      </main>

      {/* 푸터 */}
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
