import type { GetCategoriesResponseDto } from '@/features/Archive/types/getCategoriesType';
import axiosInstance from '@/lib/axiosInstance';

/**
 * GET /api/categories
 * 블로그의 모든 카테고리와 각 카테고리별 포스트 수를 가져옵니다.
 */
export const getCategories = async (): Promise<GetCategoriesResponseDto> => {
  const response = await axiosInstance.get<GetCategoriesResponseDto>('/api/categories');

  // 가드 클로저: isSuccess가 false이면 에러를 던지고 함수를 즉시 종료합니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 위 if문을 통과했다면 무조건 성공한 케이스이므로, 바로 데이터를 반환합니다.
  return response.data;
};
