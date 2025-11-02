import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ROUTES } from '@/constants/routes';
import {
  deletePostById,
  getPostById,
  getPostForEdit,
  patchPostById,
} from '@/features/Post/apis/postById';
import type {
  DeletePostRequestDto,
  GetPostByIdRequestDto,
  GetPostForEditRequestDto,
  UpdatePostRequestDto,
} from '@/features/Post/types/postByIdType';

/**
 * 게시글 상세를 조회하는 useQuery 커스텀 훅
 * @param params postId를 포함하는 객체
 */
export const useGetPostById = (params: GetPostByIdRequestDto) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPostById(params),
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!params.postId && !isNaN(params.postId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdatePostRequestDto) => patchPostById(params),

    onSuccess: (data) => {
      // 게시글 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ['post', data.postId] });
      // archive 갱신
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // alert 후 archive로 이동
      alert(`게시글 수정 성공: ${data.postId}`);
      window.location.href = ROUTES.ARCHIVE;
    },
    onError: (error) => {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('수정 실패, 콘솔 확인');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeletePostRequestDto) => deletePostById(params),

    onSuccess: (data) => {
      // 삭제된 게시글의 상세 쿼리 캐시를 즉시삭제
      queryClient.removeQueries({ queryKey: ['post', data.postId] });

      // archive 쿼리 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert(`게시글 삭제 성공: ${data.postId}`);
      window.location.href = ROUTES.ARCHIVE;
    },
    onError: (error) => {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 오류 발생. 콘솔 확인');
    },
  });
};

export const useGetPostForEdit = (params: GetPostForEditRequestDto) => {
  return useQuery({
    queryKey: ['post', 'edit', params.postId],
    queryFn: () => getPostForEdit(params),
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    enabled: !!params.postId && !isNaN(params.postId),
  });
};
