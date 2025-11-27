import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { QUERY_KEY } from '@/constants/queryKey';
import { createCategory, getCategories } from '@/features/category/category.api';

/**
 * 카테고리 싹 다 가져오깅
 * return타입 {data, isLoading, isError, error} 4개
 */
export const useGetCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY.category.INDEX,
    queryFn: getCategories,
    select: (data) => data.result.categories, // result.categories만 추출하여 반환
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    // 성공 시 get카테고리 초기화
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.category.INDEX });
      // 리턴값은 categoryId라 요청 보낼 때 보낸 category이름을 toast로 보여주기
      toast.success(`카테고리가 생성되었습니다 : ${variables.category}`);
    },

    // 생성 실패 시 toast
    onError: (error) => {
      toast.error(`카테고리 생성 실패 : ${error.message}`);
    },
  });
};
