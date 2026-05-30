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
  content: string; //  본문 HTML (BlockNote 직렬화 결과)
  summary: string | null;
  thumbnailUrl: string | null;
  categoryId: number | null;
  tags: string[]; //  Tag 이름을 string 배열로
};
export type GetPostForEditResponseDto = CommonResponseDto<GetPostForEditResultType>;

// ─────────────────────────────────────────────────────────────
// 임시저장 (Draft) - 사용자당 여러 개의 임시글을 서버에 보관.
// 작성 페이지에서 목록을 불러와 선택해 꺼내 쓰고, '임시저장' 버튼으로만 저장한다.
//   GET    /api/posts/drafts        → 내 임시글 목록 (DraftDetail[])
//   POST   /api/posts/drafts        → 새 임시글 생성 (DraftPayload) → { id, updatedAt }
//   PUT    /api/posts/drafts/:id    → 임시글 수정 (DraftPayload) → { updatedAt }
//   DELETE /api/posts/drafts/:id    → 임시글 삭제
// ─────────────────────────────────────────────────────────────

// 임시글 저장 요청 본문. 작성 도중이라 모든 값이 미완성일 수 있음.
export type DraftPayload = {
  title: string;
  content: string; // 본문 HTML
  categoryId: number | null;
  summary: string;
  thumbnailUrl: string;
  tags: string[];
};

// 임시글 1건 (목록/선택 시 사용). 본문 포함.
export type DraftDetail = DraftPayload & {
  id: number;
  updatedAt: string; // 'YYYY-MM-DD HH:MI:SS' 등
};

// 임시글 목록 조회 결과.
export type GetDraftsResultType = DraftDetail[];
export type GetDraftsResponseDto = CommonResponseDto<GetDraftsResultType>;

// 임시글 생성 결과.
export type CreateDraftResultType = { id: number; updatedAt: string };
export type CreateDraftResponseDto = CommonResponseDto<CreateDraftResultType>;

// 임시글 수정 결과.
export type UpdateDraftResultType = { updatedAt: string };
export type UpdateDraftResponseDto = CommonResponseDto<UpdateDraftResultType>;

// 게시글 작성
export type PostPostRequestDto = PostData;

export type PostPostResultType = {
  postId: number;
};

export type PostPostResponseDto = CommonResponseDto<PostPostResultType>;
