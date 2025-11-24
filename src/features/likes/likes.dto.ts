import type { CommonResponseDto } from '@/types/CommoasdfnResponseDto';

export interface TogglePostLikeRequestDto {
  postId: number;
}

// 클라이언트에 응답할 결과 데이터 타입
export interface TogglePostLikeResultType {
  postId: number;
  liked: boolean;
  newLikesCount: number;
}

export type TogglePostLikeResponseDto = CommonResponseDto<TogglePostLikeResultType>;

export interface ToggleCommentLikeRequestDto {
  commentId: number;
}

// 클라이언트에 응답할 결과 데이터 타입
export interface ToggleCommentLikeResultType {
  commentId: number;
  liked: boolean;
  newLikesCount: number;
}

export type ToggleCommentLikeResponseDto = CommonResponseDto<ToggleCommentLikeResultType>;
