import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory, getCategories } from '@/features/category/category.api';
import type { createCategoryRequestDto } from '@/features/category/category.dto';

/**
 * 카테고리 싹 다 가져오깅
 * return타입 {data, isLoading, isError, error} 4개
 */
export const useGetCategories = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    gcTime: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    select: (data) => data.result.categories, // result.categories만 추출하여 반환
  });

  return { categories: data, isLoading, isError, error };
};

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
