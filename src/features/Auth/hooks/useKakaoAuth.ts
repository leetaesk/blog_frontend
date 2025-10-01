import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { kakaoLogIn, kakaoLogOut } from '@/features/Auth/apis/kakaoAuth';
import type { KakaoLoginRequestDto } from '@/features/Auth/types/kakaoAuthType';
import useUserStore from '@/store/useUserStore';

/**
 * @description 카카오 로그인 뮤테이션 훅
 */
export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore.getState();

  return useMutation({
    mutationFn: (params: KakaoLoginRequestDto) => kakaoLogIn(params),

    onSuccess: (data) => {
      // ⭐️ 변경점: 스토어의 userInfo 객체 구조에 맞게 데이터를 조립합니다.
      setUser({
        accessToken: data.accessToken,
        userId: data.userId,
        userInfo: {
          role: data.userRole,
          nickname: data.userNickname,
          profileImageUrl: data.userProfileImageUrl,
        },
      });
      navigate(ROUTES.HOME);
    },

    onError: (error) => {
      console.error('로그인에 실패했습니다:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate(ROUTES.LOGIN);
    },
  });
};

/**
 * @description 카카오 로그아웃 뮤테이션 훅 (변경 필요 없음)
 */
export const useKakaoLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore.getState();

  return useMutation({
    mutationFn: kakaoLogOut,
    onSuccess: (data) => {
      console.log(data.message);
      clearUser();
      queryClient.clear();
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('로그아웃에 실패했습니다:', error);
      clearUser();
      queryClient.clear();
      alert('로그아웃 처리 중 오류가 발생했습니다.');
      navigate(ROUTES.HOME);
    },
  });
};
