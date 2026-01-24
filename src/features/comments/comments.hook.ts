import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QUERY_KEY } from '@/constants/queryKey';
import {
  deleteComment,
  getComments,
  getCommentsCreatedByMe,
  patchComment,
  postComment,
} from '@/features/comments/comments.api';
import type { getCommentsRequestDto } from '@/features/comments/comments.dto';
import useUserStore from '@/store/useUserStore';

export const useGetComments = (params: getCommentsRequestDto) => {
  return useQuery({
    queryKey: QUERY_KEY.comments.BY_POST_ID(params.postId),
    queryFn: () => getComments(params),
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!params.postId && !isNaN(params.postId),
  });
};

export const useGetCommentsCreatedByMe = () => {
  const userInfo = useUserStore((s) => s.userInfo);
  return useQuery({
    queryKey: QUERY_KEY.comments.BY_ME,
    queryFn: () => getCommentsCreatedByMe(),
    enabled: !!userInfo,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,

    onSuccess: (_, variables) => {
      //request body에 있던 postId 갖다 씀
      // Todo: 백에서 postId 리턴하도록 수정 후 variables 삭제
      const postId = variables.postId;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.comments.BY_POST_ID(postId) });
    },

    onError: (error) => {
      toast.error(`댓글 작성 실패: ${error.message}`);
    },
  });
};

export const usePatchComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchComment,

    onSuccess: () => {
      // postComment에서 댓글에 해당하는 게시물 id를 주지 않아서 전체 comments를 초기화 중
      // Todo: 백에서 postComment에 게시물id 리턴 => queryKey에 추가
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.comments.ALL });
      toast.success('댓글 수정 완료!');
    },

    onError: (error) => {
      toast.error(`댓글 수정 실패: ${error.message}`);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      // postComment에서 댓글에 해당하는 게시물 id를 주지 않아서 전체 comments를 초기화 중
      // Todo: 백에서 postComment에 게시물id 리턴 => queryKey에 추가
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.comments.ALL });
      toast.success('댓글이 삭제되었습니다.');
    },

    onError: (error) => {
      toast.error(`댓글 삭제 실패 : ${error.message}`);
    },
  });
};
