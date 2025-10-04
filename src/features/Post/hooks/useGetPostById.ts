import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/features/Post/apis/getPostById';
import type { GetPostByIdRequestDto } from '@/features/Post/types/getPostByIdType';

/**
 * 게시글 목록을 조회하는 useQuery 커스텀 훅
 * @param params page, limit, category를 포함하는 객체
 */
export const useGetPostById = (params: GetPostByIdRequestDto) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPostById(params),
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    enabled: !isNaN(params.postId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
