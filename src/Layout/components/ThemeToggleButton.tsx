import { useEffect } from 'react';

import clsx from 'clsx';

import useThemeStore from '@/store/themeStore';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  // Zustand 스토어의 theme 상태가 변경될 때마다 <html> 태그에 'dark' 클래스를 적용/제거합니다.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // 기존 클래스 제거
    root.classList.add(theme); // 현재 테마 클래스 추가
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="테마 전환"
      className={clsx(
        'group font-archivo border-b-border flex cursor-pointer items-center justify-center overflow-hidden border-b text-sm transition-transform duration-200',
        "before:absolute before:inset-0 before:z-[-1] before:origin-left before:scale-x-0 before:bg-gray-100 before:transition-transform before:duration-300 before:ease-out before:content-['']",
        'group-hover:before:scale-x-100',
      )}
    >
      <span className="group-hover:text-textWhite dark:group-hover:text-textDark relative z-10 transition-colors duration-300">
        {theme === 'light' ? 'LIGHT' : 'DARK'}
      </span>
    </button>
  );
};

export default ThemeToggleButton;
