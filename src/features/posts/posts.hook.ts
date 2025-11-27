import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEY } from '@/constants/queryKey';
import { urlFor } from '@/constants/routes';
import {
  deletePostById,
  getPostById,
  getPostForEdit,
  patchPostById,
  postPost,
} from '@/features/posts/posts.api';
import type {
  DeletePostRequestDto,
  GetPostByIdRequestDto,
  GetPostForEditRequestDto,
  UpdatePostRequestDto,
} from '@/features/posts/posts.dto';
import { DRAFT_STORAGE_KEY } from '@/ui/CreatePost/CreatePostPage';

/**
 * 게시글 상세 조회
 * loader 사용 - params에 initial Data 추가
 */
export const useGetPostById = (params: GetPostByIdRequestDto) => {
  return useQuery({
    queryKey: QUERY_KEY.posts.BY_POST_ID(params.postId),
    queryFn: () => getPostById(params),
    initialData: params.initialData,
    enabled: !!params.postId && !isNaN(params.postId),
  });
};

/**
 * 게시글 수정
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdatePostRequestDto) => patchPostById(params),

    onSuccess: (data) => {
      // 게시글 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.posts.BY_POST_ID(data.postId) });
      // archive 갱신
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // alert 후 archive로 이동
    },
    onError: () => {
      alert('게시글 수정 실패');
    },
  });
};

/**
 * 게시글 삭제
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeletePostRequestDto) => deletePostById(params),

    onSuccess: (data) => {
      // 삭제된 게시글의 상세 쿼리 캐시를 즉시삭제
      queryClient.removeQueries({ queryKey: QUERY_KEY.posts.BY_POST_ID(data.postId) });

      // archive 갱신
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      alert('게시글 삭제 중 오류 발생');
    },
  });
};

/**
 * 수정용 post get
 */
export const useGetPostForEdit = (params: GetPostForEditRequestDto) => {
  return useQuery({
    queryKey: QUERY_KEY.posts.FOR_EDIT(params.postId),
    queryFn: () => getPostForEdit(params),
    enabled: !!params.postId && !isNaN(params.postId),
  });
};

/**
 * 게시글 작성
 */
export const usePostPost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postPost,

    onSuccess: (data) => {
      toast.success(`게시글 작성이 완료되었습니다!`);
      // 로컬스토리지에 저장된 임시글 삭제
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(urlFor.postDetail(data.postId));
    },

    onError: (error) => {
      alert(`게시글 등록에 실패했습니다: ${error.message}`);
    },
  });
};
