import type { CommonResponseDto } from '@/types/CommonResponseDto';

export type UpdateProfileResultType = {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
};

export type UpdateProfileResponseDto = CommonResponseDto<UpdateProfileResultType>;

/**
 * 프로필 수정 시 폼밸류
 */
export type UpdateProfileFormValues = {
  nickname?: string;
  image?: FileList;
  profileAction?: 'delete' | 'use_kakao';
};
