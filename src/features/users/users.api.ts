import type { UpdateProfileResponseDto } from '@/features/users/users.dto';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const updateProfile = async (formData: FormData): Promise<UpdateProfileResponseDto> => {
  // axios가 FormData를 전송할 때 Content-Type을 'multipart/form-data'로
  // 올바른 boundary와 함께 자동 설정합니다.
  const { data } = await axiosPrivateInstance.patch<UpdateProfileResponseDto>(
    'api/users/me',
    formData,
  );
  return data;
};
