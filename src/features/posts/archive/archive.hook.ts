import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import { getPosts, getPostsLikedByMe } from '@/features/posts/archive/archive.api';
import type {
  GetPostsLikedByMeRequestDto,
  GetPostsRequestDto,
} from '@/features/posts/archive/archive.dto';
import useUserStore from '@/store/useUserStore';

export const useGetPosts = (params: GetPostsRequestDto) => {
  return useQuery({
    queryKey: QUERY_KEY.posts.ARCHIVE(params),
    queryFn: () => getPosts(params),
    select: (data) => ({
      posts: data.posts,
      pagination: data.pagination,
    }),
  });
};

export const useGetPostsLikedByMe = (params: GetPostsLikedByMeRequestDto) => {
  const userInfo = useUserStore((s) => s.userInfo);
  return useQuery({
    queryKey: QUERY_KEY.posts.ARCHIVE_LIKED_BY_ME(params),
    queryFn: () => getPostsLikedByMe(params),
    enabled: !!userInfo,
    select: (data) => ({
      posts: data.posts,
      pagination: data.pagination,
    }),
  });
};
