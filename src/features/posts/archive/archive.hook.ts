import { useQuery } from '@tanstack/react-query';

import { getPosts, getPostsLikedByMe } from '@/features/posts/archive/archive.api';
import type {
  GetPostsLikedByMeRequestDto,
  GetPostsRequestDto,
} from '@/features/posts/archive/archive.dto';

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

export const useGetPostsLikedByMe = (params: GetPostsLikedByMeRequestDto) => {
  return useQuery({
    queryKey: ['posts', 'LikedByMe', params.limit, params.page, params.category, params.search],
    queryFn: () => getPostsLikedByMe(params),
    select: (data) => ({
      posts: data.posts,
      pagination: data.pagination,
    }),
    // gcTime: 5 * 60 * 1000,
    // staleTime: 3 * 60 * 1000,
    // enabled: true,
  });
};
