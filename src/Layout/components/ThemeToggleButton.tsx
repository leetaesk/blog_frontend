import { useEffect } from 'react';

import clsx from 'clsx';

import useThemeStore from '@/store/themeStore';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  // 테마 변경 시 html 태그 클래스 업데이트 (기존 로직 유지)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      // [트랙] 버튼 전체 배경 (색상만 변경됨)
      className={clsx(
        'relative h-8 w-14 cursor-pointer rounded-full p-1 transition-colors duration-300 focus:outline-none',
        isDark ? 'bg-compDark' : 'bg-main', // 다크일 때 어두운색, 라이트일 때 밝은 하늘색
      )}
    >
      {/* [썸(Thumb)] 움직이는 하얀 동그라미 */}
      <div
        className={clsx(
          'relative flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out',
          // 다크 모드일 때 오른쪽으로 이동
          isDark ? 'translate-x-6' : 'translate-x-0',
        )}
      >
        {/* --- 해 아이콘 (Sun) --- */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={clsx(
            'absolute h-4 w-4 text-yellow-500 transition-all duration-300',
            // 라이트 모드(보임): 투명도 1, 크기 1, 회전 0
            // 다크 모드(숨김): 투명도 0, 크기 작게, 회전시켜서 숨김
            !isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0',
          )}
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>

        {/* --- 달 아이콘 (Moon) --- */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={clsx(
            'absolute h-4 w-4 text-slate-700 transition-all duration-300',
            // 다크 모드(보임): 투명도 1, 크기 1, 회전 0
            // 라이트 모드(숨김): 투명도 0, 크기 작게, 반대 방향으로 회전시켜서 숨김
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
          )}
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggleButton;
