import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleLike } from '@/features/likes/likes.api';
import type { ToggleLikeRequestDto } from '@/features/likes/likes.dto';

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ToggleLikeRequestDto) => toggleLike(params),

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
