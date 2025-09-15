import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '@/Layout/components/Navbar';
import useThemeStore from '@/store/themeStore';

const Layout = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement; // <html> 태그
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    // Navbar 공간(pt-32) + 반응형 좌우 패딩(px-6 md:px-12) + 최대 너비 제한 및 중앙 정렬(max-w-7xl mx-auto)
    <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
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
