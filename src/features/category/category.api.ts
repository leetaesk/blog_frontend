import type {
  GetCategoriesResponseDto,
  createCategoryRequestDto,
  createCategoryResponseDto,
  createCategoryResultType,
} from '@/features/category/category.dto';
import { axiosInstance, axiosPrivateInstance } from '@/lib/axiosInstance';

/**
 * GET /api/categories
 * 블로그의 모든 카테고리와 각 카테고리별 포스트 수를 가져옵니다.
 */
export const getCategories = async (): Promise<GetCategoriesResponseDto> => {
  const response = await axiosInstance.get<GetCategoriesResponseDto>('/api/categories');

  return response.data;
};

/**
 * 카테고리 생성 api
 * @param params
 *
 */
export const createCategory = async (
  params: createCategoryRequestDto,
): Promise<createCategoryResultType> => {
  const response = await axiosPrivateInstance.post<createCategoryResponseDto>(
    'api/categories',
    params,
  );

  return response.data.result;
};
