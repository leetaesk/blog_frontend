import type { CommonResponseDto } from '@/types/CommoasdfnResponseDto';

// 1. 서버 응답 DTO (백엔드와 동일)
export interface UpdateProfileResultType {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
}

export type UpdateProfileResponseDto = CommonResponseDto<UpdateProfileResultType>;

// 2. ⭐️ React Hook Form의 폼 값 타입
export interface UpdateProfileFormValues {
  nickname?: string;
  image?: FileList; // <input type="file" />의 기본 값
  profileAction?: 'delete' | 'use_kakao';
}
