export type User = 'user' | 'admin';

export type CategoryWithPostCount = {
  id: number;
  name: string;
  postCount: number;
};

export type Comment = {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  author: Author;
};

/**
 * 게시글 작성&수정 시 postDto
 */
export type PostData = {
  title: string;
  content: string;
  categoryId: number;
  summary: string;
  thumbnailUrl: string;
  tags?: string[];
};

// 카테고리 타입
export type Category = {
  id: number;
  name: string;
};

// 작성자 정보 타입
export type Author = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

// 태그 정보 타입
export type Tag = {
  id: number;
  name: string;
};

// 개별 게시글 정보 타입
export type PostListItem = {
  id: number;
  title: string;
  summary: string;
  createdAt: string; // "YYYY-MM-DD" 형식의 문자열
  thumbnailUrl: string | null;
  commentCount: number;
  category: Category;
  likesCount: number;
};

// 페이지네이션 정보 타입
export type Pagination = {
  totalPostCount: number;
  totalPage: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
};
