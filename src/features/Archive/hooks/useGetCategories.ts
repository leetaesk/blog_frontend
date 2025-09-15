import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/features/Archive/apis/getCategories';

export const useGetCategories = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data.result.categories, // result.categories만 추출하여 반환
  });

  return { categories: data, isLoading, isError, error };
};
