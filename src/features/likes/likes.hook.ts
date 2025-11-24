import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleCommentLike, togglePostLike } from '@/features/likes/likes.api';
import type {
  ToggleCommentLikeRequestDto,
  TogglePostLikeRequestDto,
} from '@/features/likes/likes.dto';

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: TogglePostLikeRequestDto) => togglePostLike(params),

    // 3. 뮤테이션 성공 시 실행
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.result.postId] });
    },

    // 5. 뮤테이션 실패 시 실행
    onError: (error) => {
      console.error(`좋아요 요청 실패: ${error.message}`);
    },
  });
};

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ToggleCommentLikeRequestDto) => toggleCommentLike(params),

    // 3. 뮤테이션 성공 시 실행
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comments', data.result.commentId] });
    },

    // 5. 뮤테이션 실패 시 실행
    onError: (error) => {
      console.error(`좋아요 요청 실패: ${error.message}`);
    },
  });
};
