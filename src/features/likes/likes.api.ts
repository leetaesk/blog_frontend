import type {
  ToggleCommentLikeRequestDto,
  ToggleCommentLikeResponseDto,
  TogglePostLikeRequestDto,
  TogglePostLikeResponseDto,
} from '@/features/likes/likes.dto';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const togglePostLike = async (
  params: TogglePostLikeRequestDto,
): Promise<TogglePostLikeResponseDto> => {
  const response = await axiosPrivateInstance.post<TogglePostLikeResponseDto>(
    `api/likes/post/${params.postId}`,
  );

  return response.data;
};

export const toggleCommentLike = async (
  params: ToggleCommentLikeRequestDto,
): Promise<ToggleCommentLikeResponseDto> => {
  const response = await axiosPrivateInstance.post<ToggleCommentLikeResponseDto>(
    `api/likes/comment/${params.commentId}`,
  );

  return response.data;
};
