import type { commonResponseDto } from '@/types/commonResponseDto';

export interface CategoryWithPostCount {
  id: number;
  name: string;
  postCount: number;
}

export interface GetCategoriesResultType {
  categories: CategoryWithPostCount[];
}

export type GetCategoriesResponseDto = commonResponseDto<GetCategoriesResultType>;
