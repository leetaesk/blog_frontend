import { create } from 'zustand';

// 스토어의 상태(state)와 액션(action)에 대한 타입을 정의합니다.
interface UiState {
  isGlobalLoading: boolean;
  showGlobalLoading: () => void;
  hideGlobalLoading: () => void;
}

// Zustand 스토어를 생성합니다.
const useUiStore = create<UiState>((set) => ({
  // 초기 상태값
  isGlobalLoading: false,

  // 상태를 변경하는 액션들
  showGlobalLoading: () => set({ isGlobalLoading: true }),
  hideGlobalLoading: () => set({ isGlobalLoading: false }),
}));

export default useUiStore;
