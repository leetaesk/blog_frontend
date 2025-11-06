import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/features/Archive/apis/getCategories';

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
