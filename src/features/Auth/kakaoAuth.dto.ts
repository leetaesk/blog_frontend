import type { CommonResponseDto } from '@/types/CommoasdfnResponseDto';

export interface KakaoLoginRequestDto {
  code: string;
}

export type User = 'user' | 'admin';

/**
 * @description 서버 -> 클라이언트: 로그인 성공 시 응답
 */

export interface KakaoLoginResultType {
  accessToken: string;
  refreshToken: string;
  userId: number; // 우리 서비스의 고유 사용자 ID
  userRole: User;
  userNickname: string;
  userProfileImageUrl: string;
  userKakaoProfileImageUrl: string;
}

export type KakaoLoginResponseDto = CommonResponseDto<KakaoLoginResultType>;

// ✨ ===== 로그아웃 응답 DTO 추가 ===== ✨
/**
 * @description 서버 -> 클라이언트: 로그아웃 성공 시 응답
 */
export interface KakaoLogoutResultType {
  message: string;
}
export type KakaoLogoutResponseDto = CommonResponseDto<KakaoLogoutResultType>;
