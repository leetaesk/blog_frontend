import type {
  GetPostsLikedByMeRequestDto,
  GetPostsLikedByMeResponseDto,
  GetPostsLikedByMeResultType,
  GetPostsRequestDto,
  GetPostsResponseDto,
  GetPostsResultType,
} from '@/features/posts/archive/archive.dto';
import { axiosInstance, axiosPrivateInstance } from '@/lib/axiosInstance';

export const getPosts = async (params: GetPostsRequestDto): Promise<GetPostsResultType> => {
  const response = await axiosInstance.get<GetPostsResponseDto>('/api/posts', {
    params,
  });

  return response.data.result;
};

export const getPostsLikedByMe = async (
  params: GetPostsLikedByMeRequestDto,
): Promise<GetPostsLikedByMeResultType> => {
  const response = await axiosPrivateInstance.get<GetPostsLikedByMeResponseDto>(
    '/api/posts/liked-by/me',
    {
      params,
    },
  );

  return response.data.result;
};
