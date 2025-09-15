import type { commonResponseDto } from '@/types/commonResponseDto';

/**
 * GET /api/posts - 요청 DTO (Query Parameters)
 * @description 게시글 목록 조회 API의 요청 쿼리를 정의합니다.
 * @property {number} page - 조회할 페이지 번호 (기본값: 1)
 * @property {number} limit - 한 페이지에 보여줄 게시글 수 (기본값: 서버에서 설정한 값, 예: 8)
 * @property {string} category - 필터링할 카테고리 이름 (선택 사항)
 */
export interface GetPostsRequestDto {
  page?: number;
  limit?: number;
  category?: string;
}

// 개별 카테고리 정보 타입
interface Category {
  id: number;
  name: string;
}

// 개별 게시글 정보 타입
interface Post {
  id: number;
  title: string;
  summary: string;
  createdAt: string; // "YYYY-MM-DD" 형식의 문자열
  thumbnailUrl: string | null;
  commentCount: number;
  category: Category;
}

// 페이지네이션 정보 타입
interface Pagination {
  totalPostCount: number;
  totalPage: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

/**
 * GET /api/posts - 응답의 `result` 필드 타입
 * @description 게시글 목록 조회 API 응답의 실제 데이터 부분을 정의합니다.
 */
export type GetPostsResultType = {
  posts: Post[];
  pagination: Pagination;
};

/**
 * GET /api/posts - 최종 응답 타입
 * @description 게시글 목록 조회 API의 최종 응답 형태를 정의합니다.
 */
export type GetPostsResponseDto = commonResponseDto<GetPostsResultType>;
