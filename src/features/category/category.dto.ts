import type { CommonResponseDto } from '@/types/CommonResponseDto';
import type { CategoryWithPostCount } from '@/types/CommonTypes';

// get categories dto
export type GetCategoriesResultType = {
  categories: CategoryWithPostCount[];
};

export type GetCategoriesResponseDto = CommonResponseDto<GetCategoriesResultType>;

// create categories dto
export type createCategoryRequestDto = {
  category: string;
};

export type createCategoryResultType = {
  categoryId: number;
};

export type createCategoryResponseDto = CommonResponseDto<createCategoryResultType>;
