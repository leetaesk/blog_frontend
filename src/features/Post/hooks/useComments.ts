import { useQuery } from '@tanstack/react-query';

import { getComments } from '@/features/Post/apis/comments';
import type { getCommentsRequestDto } from '@/features/Post/types/commentsType';

export const useGetComments = (params: getCommentsRequestDto) => {
  return useQuery({
    queryKey: ['comments', params.postId],
    queryFn: () => getComments(params),
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!params.postId && !isNaN(params.postId),
  });
};
