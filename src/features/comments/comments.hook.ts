import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { getComments, getCommentsCreatedByMe, postComment } from '@/features/comments/comments.api';
import type {
  getCommentsRequestDto,
  postCommentRequestDto,
} from '@/features/comments/comments.dto';

export const useGetComments = (params: getCommentsRequestDto) => {
  return useQuery({
    queryKey: ['comments', params.postId],
    queryFn: () => getComments(params),
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!params.postId && !isNaN(params.postId),
  });
};

export const useGetCommentsCreatedByMe = () => {
  return useQuery({
    queryKey: ['comments', 'byMe'],
    queryFn: () => getCommentsCreatedByMe(),
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
  });
};

export const usePostComment = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (params: postCommentRequestDto) => postComment(params),

    // 3. 뮤테이션 성공 시 실행 (API가 isSuccess: true 반환 시)
    onSuccess: (data) => {
      console.log(`postComment 성공, commentId:${data.id}`);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },

    // 5. 뮤테이션 실패 시 실행 (API가 에러를 throw 시)
    onError: (error) => {
      alert(`댓글 작성 실패, 콘솔 확인: ${error.message}`);
      console.log(error);
    },
  });
};
