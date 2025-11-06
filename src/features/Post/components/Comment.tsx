import { useState } from 'react';

// types/commentTypes에서 CommentByUser 타입을 가져온다고 가정합니다.
// (사용자 쿼리에서 가져온 경로)
import type { CommentByUser } from '@/features/Post/types/commentsType';
import type { Author } from '@/features/Post/types/postByIdType';

// [FIX] 임시 ProfileImage 컴포넌트
// '@/components/ProfileImage' 경로 오류를 해결하기 위한 임시 컴포넌트입니다.
const ProfileImage = ({ src, alt }: { src: string | null; alt: string }) => {
  if (!src) {
    // 닉네임의 첫 글자를 따오는 로직을 간소화 (alt에서 첫 글자 추출 시도)
    const fallbackInitial = alt.charAt(0) || '?';
    return (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-500">
        <span className="text-lg font-semibold">{fallbackInitial}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" />;
};

// [FIX] 임시 formatDate 함수
// '@/utils/formatDate' 경로 오류를 해결하기 위한 임시 함수입니다.
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // 간단한 날짜 형식 (예: YYYY.MM.DD)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (e) {
    return dateString; // 파싱 실패 시 원본 문자열 반환
  }
};

// --- Mock Authors ---
const devKingKim: Author = {
  id: 1,
  nickname: '개발왕김씨',
  profileImageUrl: 'https://placehold.co/100x100/A7F3D0/065F46?text=B',
};

const reactLover: Author = {
  id: 2,
  nickname: '리액트좋아',
  profileImageUrl: 'https://placehold.co/100x100/E2E8F0/334155?text=R',
};

const tsMaster: Author = {
  id: 3,
  nickname: '타입스크립트장인',
  profileImageUrl: 'https://placehold.co/100x100/BFDBFE/1E3A8A?text=T',
};

const backendGuy: Author = {
  id: 4,
  nickname: '백엔드개발자',
  profileImageUrl: 'https://placehold.co/100x100/A7F3D0/065F46?text=B',
};

const newUser: Author = {
  id: 5,
  nickname: '뉴비',
  profileImageUrl: 'https://placehold.co/100x100/A7F3D0/065F46?text=B',
};

// --- Mock Replies (Depth 1) ---
// (현재 로그인한 사용자는 id: 1 '개발왕김씨'라고 가정)

const mockReply1: CommentByUser = {
  id: 201,
  content: 'Vite 정말 좋죠! 저도 매일 씁니다.',
  userId: 2,
  createdAt: '2025-09-15 06:15:00',
  updatedAt: '2025-09-15 06:15:00',
  likesCount: 2,
  author: reactLover,
  isOwner: false, // 현재 유저(1)가 아님
  isLiked: true, // 현재 유저(1)가 좋아요 누름
  replise: [],
  repliseCount: 0,
};

const mockReply2: CommentByUser = {
  id: 202,
  content: '타입스크립트랑 궁합이 정말 최고입니다.',
  userId: 3,
  createdAt: '2025-09-15 07:30:00',
  updatedAt: '2025-09-15 07:30:00',
  likesCount: 0,
  author: tsMaster,
  isOwner: false,
  isLiked: false,
  replise: [],
  repliseCount: 0,
};

const mockReply3: CommentByUser = {
  id: 203,
  content: '맞아요! 특히 zod랑 같이 쓰면 안정성이 2배!',
  userId: 1,
  createdAt: '2025-09-15 08:02:00',
  updatedAt: '2025-09-15 08:02:00',
  likesCount: 1,
  author: devKingKim,
  isOwner: true, // 현재 유저(1)가 작성
  isLiked: false,
  replise: [],
  repliseCount: 0,
};

const mockReply4: CommentByUser = {
  id: 204,
  content: '백엔드에서도 이런 빠른 빌드툴이 있었으면 좋겠네요.',
  userId: 4,
  createdAt: '2025-09-15 09:30:12',
  updatedAt: '2025-09-15 09:30:12',
  likesCount: 0,
  author: backendGuy,
  isOwner: false,
  isLiked: false,
  replise: [],
  repliseCount: 0,
};

// --- Main Mock Comment Data ---

export const mockCommentData: CommentByUser = {
  id: 101,
  content: 'Vite + TS 조합은 정말 최고죠! \n개발 속도가 엄청나게 빨라졌어요.',
  userId: 5, // '뉴비'가 작성한 댓글
  createdAt: '2025-09-15 05:23:04',
  updatedAt: '2025-09-15 05:23:04',
  likesCount: 5,
  author: newUser,
  isOwner: false, // 현재 유저(1)가 작성한 것이 아님
  isLiked: false,
  replise: [mockReply1, mockReply2, mockReply3, mockReply4], // 답글 4개 포함
  repliseCount: 4,
};

type CommentProps = {
  /** 표시할 댓글 객체 */
  comment: CommentByUser;
};

export const Comment = ({ comment }: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  // [FIX] 버그 수정: mockCommentData 대신 props로 받은 comment를 사용합니다.
  const { author, content, createdAt, likesCount, repliseCount, replise, isLiked, isOwner } =
    comment;

  return (
    <div className="flex space-x-3 border-b border-gray-100 py-4 last:border-b-0">
      {/* 1. 프로필 이미지 */}
      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <ProfileImage src={author.profileImageUrl} alt={`${author.nickname} 프로필`} />
      </div>

      <div className="flex-1">
        {/* 2. 작성자 정보 (닉네임, 작성일) */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-900">{author.nickname}</span>
            <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
          </div>
          {/* TODO: isOwner가 true일 경우 여기에 수정/삭제 버튼 렌더링
            {isOwner && (
              <div className="ml-auto"> ... </div>
            )}
          */}
        </div>

        {/* 3. 댓글 내용 */}
        {/* 'whitespace-pre-wrap'은 줄바꿈(\n)을 그대로 렌더링해줍니다. */}
        <p className="mt-1 mb-2 text-sm whitespace-pre-wrap text-gray-800">{content}</p>

        {/* 4. 댓글 하단 액션 (좋아요, 답글) */}
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <button
            type="button"
            className={`flex items-center space-x-1 transition-colors hover:text-blue-600 ${
              isLiked ? 'font-bold text-blue-600' : ''
            }`}
            aria-label={`좋아요 ${likesCount}개`}
          >
            {/* TODO: 좋아요 아이콘 (예: SVG) */}
            <span>좋아요</span>
            {likesCount > 0 && <span className="font-medium">{likesCount}</span>}
          </button>

          {/* TODO: 답글 달기 기능 연결 (클릭 시 답글 입력창 토글) */}
          <button type="button" className="transition-colors hover:text-gray-900">
            <span>답글 달기</span>
          </button>

          {/* 답글이 있을 경우에만 '답글 N개' 버튼 표시 */}
          {repliseCount > 0 && (
            <button
              type="button"
              className="transition-colors hover:text-gray-900"
              onClick={() => setShowReplies(!showReplies)}
            >
              <span>{showReplies ? '답글 숨기기' : `답글 ${repliseCount}개`}</span>
            </button>
          )}
        </div>

        {/* 5. 답글 목록 (토글됨) */}
        {showReplies && replise.length > 0 && (
          <div className="mt-4 space-y-4">
            {replise.map((reply) => (
              // 답글도 동일한 Comment 컴포넌트를 재귀적으로 사용
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
