import type {
  DeleteCommentRequestDto,
  deleteCommentResponseDto,
  deleteCommentResultType,
  getCommentsCreatedByMeResponseDto,
  getCommentsCreatedByMeResultType,
  getCommentsRequestDto,
  getCommentsResponseDto,
  getCommentsResultType,
  patchCommentRequestDto,
  patchCommentResponseDto,
  patchCommentResultType,
  postCommentRequestDto,
  postCommentResponseDto,
  postCommentResultType,
} from '@/features/comments/comments.dto';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const getComments = async (
  params: getCommentsRequestDto,
): Promise<getCommentsResultType> => {
  const response = await axiosPrivateInstance.get<getCommentsResponseDto>(
    `/api/comments/${params.postId}`,
  );

  return response.data.result;
};

/**
 * @description 내가 쓴 댓글 목록 가져오기
 */
export const getCommentsCreatedByMe = async (): Promise<getCommentsCreatedByMeResultType> => {
  const response =
    await axiosPrivateInstance.get<getCommentsCreatedByMeResponseDto>(`/api/comments/me`);

  return response.data.result;
};

export const postComment = async (
  params: postCommentRequestDto,
): Promise<postCommentResultType> => {
  const response = await axiosPrivateInstance.post<postCommentResponseDto>(`/api/comments`, params);

  return response.data.result;
};

export const patchComment = async (
  params: patchCommentRequestDto,
): Promise<patchCommentResultType> => {
  const response = await axiosPrivateInstance.patch<patchCommentResponseDto>(
    `/api/comments/${params.commentId}`,
    { content: params.content },
  );

  return response.data.result;
};

export const deleteComment = async (
  params: DeleteCommentRequestDto,
): Promise<deleteCommentResultType> => {
  const response = await axiosPrivateInstance.delete<deleteCommentResponseDto>(
    `/api/comments/${params.commentId}`,
  );

  return response.data.result;
};
