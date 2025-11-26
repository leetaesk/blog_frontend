import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { UpdateProfileSchemaType } from '@/features/users/users.schema';
import useUserStore from '@/store/useUserStore';

import { updateProfile } from './users.api';

export const useUpdateMyProfile = () => {
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

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      updateUserInfo({
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
      });
    },
    onError: () => {
      toast.error('프로필 업데이트 실패:');
    },
  });
};
