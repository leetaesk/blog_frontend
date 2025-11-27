import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { toggleCommentLike, togglePostLike } from '@/features/likes/likes.api';
import type {
  ToggleCommentLikeRequestDto,
  TogglePostLikeRequestDto,
} from '@/features/likes/likes.dto';

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: TogglePostLikeRequestDto) => togglePostLike(params),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.result.postId] });
    },

    onError: (error) => {
      toast.error(`좋아요 요청 실패: ${error.message}`);
    },
  });
};

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ToggleCommentLikeRequestDto) => toggleCommentLike(params),

    onSuccess: () => {
      // Todo: 좋아요 누른 댓글이 있는 게시글 postId 필요함 -> 쿼리키 넣어야 함
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },

    onError: (error) => {
      toast.error(`좋아요 요청 실패: ${error.message}`);
    },
  });
};
