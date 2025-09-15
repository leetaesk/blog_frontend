import type { GetCategoriesResponseDto } from '@/features/Archive/types/getCategoriesType';
import axiosInstance from '@/lib/axiosInstance';

/**
 * GET /api/categories
 * 블로그의 모든 카테고리와 각 카테고리별 포스트 수를 가져옵니다.
 */
export const getCategories = async (): Promise<GetCategoriesResponseDto> => {
  const response = await axiosInstance.get('/api/categories');
  return response.data;
};
