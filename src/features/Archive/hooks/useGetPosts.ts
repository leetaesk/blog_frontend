import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../apis/getPosts';
import type { GetPostsRequestDto } from '../types/getPostsType';

/**
 * 게시글 목록을 조회하는 useQuery 커스텀 훅
 * @param params page, limit, category를 포함하는 객체
 */
export const useGetPosts = (params: GetPostsRequestDto) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', params.limit, params.page, params.category, params.search],
    queryFn: () => getPosts(params),
    select: (data) => ({
      posts: data.posts,
      pagination: data.pagination,
    }),
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    enabled: true,
  });

  return {
    posts: data?.posts,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};
