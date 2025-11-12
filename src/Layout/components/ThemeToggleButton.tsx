import { useEffect } from 'react';

import clsx from 'clsx';
import { useNavigation } from 'react-router-dom';

import useThemeStore from '@/store/themeStore';
import useUiStore from '@/store/useUiStore';

const ThemeToggleButton = () => {
  const { showGlobalLoading, hideGlobalLoading } = useUiStore();
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
