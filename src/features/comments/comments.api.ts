import type {
  getCommentsCreatedByMeResponseDto,
  getCommentsCreatedByMeResultType,
  getCommentsRequestDto,
  getCommentsResponseDto,
  getCommentsResultType,
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
  const response = await axiosPrivateInstance.get<postCommentResponseDto>(`/api/comments`, {
    params,
  });

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};
