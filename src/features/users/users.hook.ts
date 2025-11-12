import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { UpdateProfileResponseDto } from '@/features/users/users.dto';
import type { UpdateProfileSchemaType } from '@/features/users/users.schema';
import useUserStore from '@/store/useUserStore';

import { updateProfile } from './users.api';

export const useUpdateMyProfile = (
  onSuccess?: (data: UpdateProfileResponseDto) => void,
  onError?: (error: AxiosError | Error) => void,
) => {
  const updateUserInfo = useUserStore((s) => s.updateUserInfo);

  const mutationFn = async (data: UpdateProfileSchemaType) => {
    const formData = new FormData();

    // 1. 닉네임 추가
    if (data.nickname) {
      formData.append('nickname', data.nickname);
    }

    // 2. 이미지 파일 추가 (새로 업로드 시)
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    // 3. 프로필 액션 추가 (삭제 또는 카카오)
    if (data.profileAction) {
      formData.append('profileAction', data.profileAction);
    }

    return updateProfile(formData);
  };

  return useMutation<
    UpdateProfileResponseDto, // 성공 시 반환 타입
    AxiosError | Error, // 실패 시 에러 타입
    UpdateProfileSchemaType // mutationFn의 인자(폼 값) 타입
  >({
    mutationFn,
    onSuccess: (data) => {
      //세션스토리지 업데이트
      updateUserInfo({
        nickname: data.result.nickname,
        profileImageUrl: data.result.profileImageUrl,
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
      onError?.(error);
    },
  });
};
