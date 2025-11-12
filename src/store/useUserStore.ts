import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 1. userInfo 객체의 타입을 명확하게 정의합니다.
interface UserInfo {
  role: 'user' | 'admin';
  nickname: string;
  profileImageUrl: string | null; // ⭐️ null 허용 (백엔드 응답과 일치)
  kakaoProfileImageUrl: string | null; // ⭐️ null 허용
}

// 2. UserState에서 닉네임과 프로필 이미지 URL 필드를 userInfo 객체로 통합합니다.
interface UserState {
  accessToken: string | null;
  userId: number | null;
  userInfo: UserInfo | null;
}

// 3. setUser 액션이 받을 데이터 타입을 정의합니다.
interface SetUserPayload {
  accessToken: string;
  userId: number;
  userInfo: UserInfo;
}

// ⭐️ 4. (추가) 프로필 업데이트용 payload 타입
interface UpdateUserInfoPayload {
  nickname: string;
  profileImageUrl: string | null;
}

interface UserActions {
  setUser: (payload: SetUserPayload) => void;
  clearUser: () => void;
  // ⭐️ 5. (추가) 프로필 업데이트 액션 정의
  updateUserInfo: (payload: UpdateUserInfoPayload) => void;
}

const useUserStore = create(
  persist<UserState & UserActions>(
    (set) => ({
      // 초기 상태
      accessToken: null,
      userId: null,
      userInfo: null,

      // 4. setUser 액션: payload 전체를 받아 상태를 업데이트합니다.
      setUser: (payload) => set(payload),

      // 5. clearUser 액션: 모든 상태를 초기값으로 되돌립니다.
      clearUser: () =>
        set({
          accessToken: null,
          userId: null,
          userInfo: null,
        }),

      // ⭐️ 6. (추가) updateUserInfo 액션 구현
      updateUserInfo: (payload) =>
        set((state) => ({
          ...state, // accessToken, userId 등 기존 상태 유지
          userInfo: state.userInfo
            ? {
                ...state.userInfo, // role, kakaoUrl 등 기존 userInfo 유지
                nickname: payload.nickname, // 닉네임만 덮어쓰기
                profileImageUrl: payload.profileImageUrl, // 프로필 이미지만 덮어쓰기
              }
            : null, // userInfo가 없었으면 null 유지
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
