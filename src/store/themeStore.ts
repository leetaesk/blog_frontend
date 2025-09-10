import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. 스토어의 상태와 액션에 대한 타입을 정의합니다.
interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. 시스템의 다크모드 설정 여부를 확인하는 함수
const getSystemTheme = (): 'light' | 'dark' => {
  // window 객체가 존재하고, matchMedia API를 지원하는지 확인 (SSR 환경 고려)
  if (typeof window !== 'undefined' && window.matchMedia) {
    // 사용자가 다크 모드를 선호하면 'dark', 아니면 'light' 반환
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  // window 객체가 없으면 기본값으로 'light' 반환
  return 'light';
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // 3. 초기값을 시스템 설정에서 가져오도록 수정
      theme: getSystemTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage', // localStorage에 저장될 key 이름
    },
  ),
);

export default useThemeStore;
