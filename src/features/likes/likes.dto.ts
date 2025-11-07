import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface ToggleLikeRequestDto {
  postId: number;
}

// 클라이언트에 응답할 결과 데이터 타입
export interface ToggleLikeResultType {
  postId: number;
  liked: boolean;
  newLikesCount: number;
}

export type ToggleLikeResponseDto = CommonResponseDto<ToggleLikeResultType>;
