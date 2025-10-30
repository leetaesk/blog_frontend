import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory } from '@/features/Post/apis/createCategory';
import type { createCategoryRequestDto } from '@/features/Post/types/createCategoryType';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: createCategoryRequestDto) => createCategory(params),

    // 3. 뮤테이션 성공 시 실행 (API가 isSuccess: true 반환 시)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },

    // 5. 뮤테이션 실패 시 실행 (API가 에러를 throw 시)
    onError: (error) => {
      console.error('카테고리 생성 실패:', error);
    },
  });
};
