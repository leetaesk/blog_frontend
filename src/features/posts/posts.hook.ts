import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES, urlFor } from '@/constants/routes';
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
  PostPostRequestDto,
  UpdatePostRequestDto,
} from '@/features/posts/posts.dto';
import { DRAFT_STORAGE_KEY } from '@/ui/CreatePost/CreatePostPage';

/**
 * 게시글 상세를 조회하는 useQuery 커스텀 훅
 * @param params postId를 포함하는 객체
 */
export const useGetPostById = (params: GetPostByIdRequestDto) => {
  return useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPostById(params),
    initialData: params.initialData,
    // gcTime: 5 * 60 * 1000,
    // staleTime: 3 * 60 * 1000,
    // postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!params.postId && !isNaN(params.postId),
    refetchOnWindowFocus: false,
  });
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

export const usePostPost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: PostPostRequestDto) => postPost(params),

    // 3. 뮤테이션 성공 시 실행 (API가 isSuccess: true 반환 시)
    onSuccess: (data) => {
      alert(`postpost 성공, postId:${data.postId}`);
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(urlFor.postDetail(data.postId));
    },

    // 5. 뮤테이션 실패 시 실행 (API가 에러를 throw 시)
    onError: (error) => {
      alert(`게시글 등록에 실패했습니다: ${error.message}`);
    },
  });
};
