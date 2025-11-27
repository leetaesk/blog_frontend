import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { kakaoLogIn, kakaoLogOut } from '@/features/Auth/kakaoAuth.api';
import type { KakaoLoginRequestDto } from '@/features/Auth/kakaoAuth.dto';
import useUserStore from '@/store/useUserStore';

/**
 * 카카오 로그인 훅
 * 성공 시 홈으로 리다이렉트
 * 에러 시 로그이능로 리다이렉트 / alert
 */
export const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: (params: KakaoLoginRequestDto) => kakaoLogIn(params),

    onSuccess: (data) => {
      setUser({
        accessToken: data.accessToken,
        userId: data.userId,
        userInfo: {
          role: data.userRole,
          nickname: data.userNickname,
          profileImageUrl: data.userProfileImageUrl,
          kakaoProfileImageUrl: data.userKakaoProfileImageUrl,
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
 * 카카오 로그아웃 뮤테이션 훅
 * 성공 시 홈으로
 * 에러 시 프론트단 로그아웃 optimistic
 */
export const useKakaoLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUser = useUserStore((s) => s.clearUser);

  return useMutation({
    mutationFn: kakaoLogOut,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('로그아웃에 실패했습니다:', error);
      // 서버 로그아웃 실패여도 프론트에서는 로그아웃 처리가 된것처럼 : optimistic
      clearUser();
      queryClient.clear();
      navigate(ROUTES.HOME);
    },
  });
};
