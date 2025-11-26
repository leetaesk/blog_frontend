import type {
  KakaoLoginRequestDto,
  KakaoLoginResponseDto,
  KakaoLoginResultType,
  KakaoLogoutResponseDto,
  KakaoLogoutResultType,
} from '@/features/Auth/kakaoAuth.dto';
import { axiosInstance, axiosPrivateInstance } from '@/lib/axiosInstance';

export const kakaoLogIn = async (params: KakaoLoginRequestDto): Promise<KakaoLoginResultType> => {
  const response = await axiosInstance.post<KakaoLoginResponseDto>(`/api/auth/kakao/login`, params);

  return response.data.result;
};

export const kakaoLogOut = async (): Promise<KakaoLogoutResultType> => {
  const response =
    await axiosPrivateInstance.post<KakaoLogoutResponseDto>(`/api/auth/kakao/logout`);

  return response.data.result;
};
