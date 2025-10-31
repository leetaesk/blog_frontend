import type { PostData } from '@/features/Post/types/postByIdType';
import type { CommonResponseDto } from '@/types/CommonResponseDto';

export type PostPostRequestDto = PostData;

export interface PostPostResultType {
  postId: number;
}

export type PostPostResponseDto = CommonResponseDto<PostPostResultType>;
