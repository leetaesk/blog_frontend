import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface createCategoryRequestDto {
  category: string;
}

export interface createCategoryResultType {
  categoryId: number;
}

export type createCategoryResponseDto = CommonResponseDto<createCategoryResultType>;
