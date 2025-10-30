import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import { postPost } from '@/features/Post/apis/postPost';
import type { PostPostRequestDto } from '@/features/Post/schemas/postSchema';

export const usePostPost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: PostPostRequestDto) => postPost(params),

    // 3. 뮤테이션 성공 시 실행 (API가 isSuccess: true 반환 시)
    onSuccess: (data) => {
      alert(`postpost 성공, postId:${data.postId}`);
      navigate(urlFor.postDetail(data.postId));
    },

    // 5. 뮤테이션 실패 시 실행 (API가 에러를 throw 시)
    onError: (error) => {
      alert(`게시글 등록에 실패했습니다: ${error.message}`);
    },
  });
};
