import type { CommonResponseDto } from '@/types/CommonResponseDto';
import type { User } from '@/types/CommonTypes';

// 로그인
export type KakaoLoginRequestDto = {
  /**
   * 인가코드
   */
  code: string;
  /**
   * env에서 추출하여 넣어주기
   */
  redirectURI: string;
};

export type KakaoLoginResultType = {
  accessToken: string;
  refreshToken: string;
  userId: number; // 우리 서비스의 고유 사용자 ID
  userRole: User;
  userNickname: string;
  userProfileImageUrl: string;
  userKakaoProfileImageUrl: string;
};

export type KakaoLoginResponseDto = CommonResponseDto<KakaoLoginResultType>;

// 로그아웃
export type KakaoLogoutResultType = {
  message: string;
};
export type KakaoLogoutResponseDto = CommonResponseDto<KakaoLogoutResultType>;
