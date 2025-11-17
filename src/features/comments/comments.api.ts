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

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

export const getCommentsCreatedByMe = async (): Promise<getCommentsCreatedByMeResultType> => {
  const response =
    await axiosPrivateInstance.get<getCommentsCreatedByMeResponseDto>(`/api/comments/me`);

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

export const postComment = async (
  params: postCommentRequestDto,
): Promise<postCommentResultType> => {
  const response = await axiosPrivateInstance.post<postCommentResponseDto>(`/api/comments`, params);

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

export const patchComment = async (
  params: patchCommentRequestDto,
): Promise<patchCommentResultType> => {
  const response = await axiosPrivateInstance.patch<patchCommentResponseDto>(
    `/api/comments/${params.commentId}`,
    { content: params.content },
  );

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

export const deleteComment = async (
  params: DeleteCommentRequestDto,
): Promise<deleteCommentResultType> => {
  const response = await axiosPrivateInstance.delete<deleteCommentResponseDto>(
    `/api/comments/${params.commentId}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};
