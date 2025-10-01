import type {
  KakaoLoginRequestDto,
  KakaoLoginResponseDto,
  KakaoLoginResultType,
  KakaoLogoutResponseDto,
  KakaoLogoutResultType,
} from '@/features/Auth/types/kakaoAuthType';
import axiosInstance from '@/lib/axiosInstance';

export const kakaoLogIn = async (params: KakaoLoginRequestDto): Promise<KakaoLoginResultType> => {
  const response = await axiosInstance.post<KakaoLoginResponseDto>(`/api/auth/kakao/login`, params);

  // 가드 클로저: isSuccess가 false이면 에러를 던지고 함수를 즉시 종료합니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 위 if문을 통과했다면 무조건 성공한 케이스이므로, 바로 데이터를 반환합니다.
  return response.data.result;
};

export const kakaoLogOut = async (): Promise<KakaoLogoutResultType> => {
  const response = await axiosInstance.post<KakaoLogoutResponseDto>(`/api/auth/kakao/logout`);

  // 가드 클로저: isSuccess가 false이면 에러를 던지고 함수를 즉시 종료합니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 위 if문을 통과했다면 무조건 성공한 케이스이므로, 바로 데이터를 반환합니다.
  return response.data.result;
};
