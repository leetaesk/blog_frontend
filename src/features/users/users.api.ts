import type { UpdateProfileResponseDto, UpdateProfileResultType } from '@/features/users/users.dto';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const updateProfile = async (formData: FormData): Promise<UpdateProfileResultType> => {
  const response = await axiosPrivateInstance.patch<UpdateProfileResponseDto>(
    'api/users/me',
    formData,
  );

  return response.data.result;
};
