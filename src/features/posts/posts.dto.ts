import type { CommonResponseDto } from '@/types/CommonResponseDto';
import type { Author, Category, PostData, Tag } from '@/types/CommonTypes';

// 게시글 by Id
export type GetPostByIdRequestDto = {
  postId: number;
  initialData?: GetPostByIdResultType;
};

export type GetPostByIdResultType = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string | null;
  views: number;
  createdAt: string; // 'YYYY-MM-DD HH:MI:SS' 형식
  updatedAt: string; // 'YYYY-MM-DD HH:MI:SS' 형식
  author: Author;
  category: Category | null; // 카테고리가 없을 수 있음
  tags: Tag[]; // 태그는 여러 개일 수 있고, 없을 수도 있음
  commentCount: number;
  likesCount: number;
  isLikedByUser: boolean;
};

export type GetPostByIdResponseDto = CommonResponseDto<GetPostByIdResultType>;

// 게시글 수정
export type UpdatePostRequestDto = Partial<PostData> & {
  postId: number;
};

export type UpdatePostResultType = {
  postId: number;
};
export type UpdatePostResponseDto = CommonResponseDto<UpdatePostResultType>;

// 게시글 삭제
export type DeletePostRequestDto = {
  postId: number;
};

export type DeletePostResultType = {
  postId: number;
};
export type DeletePostResponseDto = CommonResponseDto<DeletePostResultType>;

// 수정용 get
export type GetPostForEditRequestDto = {
  postId: number;
};

export type GetPostForEditResultType = {
  title: string;
  content: string; //  원본 Markdown
  summary: string | null;
  thumbnailUrl: string | null;
  categoryId: number | null;
  tags: string[]; //  Tag 이름을 string 배열로
};
export type GetPostForEditResponseDto = CommonResponseDto<GetPostForEditResultType>;

// 게시글 작성
export type PostPostRequestDto = PostData;

export type PostPostResultType = {
  postId: number;
};

export type PostPostResponseDto = CommonResponseDto<PostPostResultType>;
