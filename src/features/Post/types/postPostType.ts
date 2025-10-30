import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface PostPostRequestDto {
  title: string;
  content: string;
  categoryId: number;
  summary: string;
  thumbnailUrl: string;
  tags?: string[];
}

export interface PostPostResultType {
  postId: number;
}

export type PostPostResponseDto = CommonResponseDto<PostPostResultType>;
