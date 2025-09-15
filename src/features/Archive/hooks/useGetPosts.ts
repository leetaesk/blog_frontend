import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../apis/getPosts';
import type { GetPostsRequestDto } from '../types/getPostsType';

/**
 * 게시글 목록을 조회하는 useQuery 커스텀 훅
 * @param params page, limit, category를 포함하는 객체
 */
export const useGetPosts = (params: GetPostsRequestDto) => {
  // 쿼리 키: params가 변경될 때마다 쿼리를 자동으로 리프레시하기 위해 사용됩니다.
  const queryKey = ['posts', params];

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    // queryFn은 Promise를 반환하는 함수여야 합니다.
    queryFn: () => getPosts(params),
    // staleTime, gcTime(cacheTime) 등 옵션을 필요에 따라 추가할 수 있습니다.
    // 예: staleTime: 5 * 60 * 1000, // 5분
  });

  return {
    posts: data?.posts,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};
