import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface CategoryWithPostCount {
  id: number;
  name: string;
  postCount: number;
}

export interface GetCategoriesResultType {
  categories: CategoryWithPostCount[];
}

export type GetCategoriesResponseDto = CommonResponseDto<GetCategoriesResultType>;

export interface createCategoryRequestDto {
  category: string;
}

export interface createCategoryResultType {
  categoryId: number;
}

export type createCategoryResponseDto = CommonResponseDto<createCategoryResultType>;
