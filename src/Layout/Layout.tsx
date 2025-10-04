import { useEffect } from 'react';

import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';
import BounceLoader from '@/components/BounceLoader';
import useScrollToTop from '@/hooks/useScrollToTop';
import useThemeStore from '@/store/themeStore';
import useUiStore from '@/store/useUiStore';

const Layout = () => {
  const location = useLocation();
  useScrollToTop(location);
  const { isGlobalLoading, showGlobalLoading, hideGlobalLoading } = useUiStore();
  const { theme, toggleTheme } = useThemeStore();

  // Zustand 스토어의 theme 상태가 변경될 때마다 <html> 태그에 'dark' 클래스를 적용/제거합니다.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // 기존 클래스 제거
    root.classList.add(theme); // 현재 테마 클래스 추가
  }, [theme]);

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
    // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 정렬(max-w-7xl mx-auto)
    <div className="mx-auto max-w-7xl px-6 pt-32 md:px-12">
      {isGlobalLoading && <BounceLoader />}
      <Navbar />
      <Outlet />
      <button
        onClick={toggleTheme}
        aria-label="테마 전환"
        // 화면 오른쪽 하단에 고정시키는 스타일입니다.
        className="fixed top-5 right-5 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 text-2xl shadow-lg transition-transform duration-200 hover:scale-110 dark:bg-neutral-800"
      >
        {/* 현재 테마에 따라 다른 이모지를 보여줍니다. */}
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default Layout;
