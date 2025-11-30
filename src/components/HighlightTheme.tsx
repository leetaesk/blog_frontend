import { useEffect } from 'react';

import darkTheme from 'highlight.js/styles/github-dark.css?inline';
// Vite의 '?inline' 기능을 사용하면 CSS를 적용하지 않고 텍스트로 가져옵니다!
// ⭐️ 원하는 테마가 있다면 여기서 파일명만 바꾸면 됩니다.
import lightTheme from 'highlight.js/styles/github.css?inline';

import useThemeStore from '@/store/themeStore';

export default function HighlightTheme() {
  const isDarkMode = useThemeStore((state) => state.theme) === 'dark';

  useEffect(() => {
    // 1. id가 'hljs-theme'인 style 태그를 찾거나 만듭니다.
    let styleTag = document.getElementById('hljs-theme');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'hljs-theme';
      document.head.appendChild(styleTag);
    }

    // 2. 다크모드 상태에 따라 라이브러리 CSS 내용을 넣어줍니다.
    styleTag.innerHTML = isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]); // 테마가 바뀔 때마다 실행

  return null; // 화면에 그릴 건 없음
}
