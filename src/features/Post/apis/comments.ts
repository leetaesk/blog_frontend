import type {
  getCommentsRequestDto,
  getCommentsResponseDto,
  getCommentsResultType,
} from '@/features/Post/types/commentsType';
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
