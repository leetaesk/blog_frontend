import { useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import type { CommentByUser } from '@/features/comments/comments.dto';
import { formatDate } from '@/utils/formatDate';

interface CommentProps {
  comment: CommentByUser;
}

export const Comment = ({ comment }: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const { author, content, createdAt, likesCount, repliesCount, replies, isLiked, isOwner } =
    comment;

  return (
    <div className="flex py-4 space-x-3 border-b border-gray-100 last:border-b-0">
      {/* 1. 프로필 이미지 */}
      <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
        <ProfileImage src={author.profileImageUrl} alt={`${author.nickname} 프로필`} />
      </div>

      <div className="flex-1">
        {/* 2. 작성자 정보 (닉네임, 작성일) */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-end gap-2">
              <span className="text-sm font-semibold">{author.nickname}</span>
              <span className="text-xs">{formatDate(createdAt)}</span>
            </div>
            {isOwner && <div className="ml-auto"> 수정삭제버튼렌더링 </div>}
          </div>
        </div>

        {/* 3. 댓글 내용 */}
        {/* 'whitespace-pre-wrap'은 줄바꿈(\n)을 그대로 렌더링해줍니다. */}
        <p className="mt-1 mb-2 text-sm whitespace-pre-wrap">{content}</p>

        {/* 4. 댓글 하단 액션 (좋아요, 답글) */}
        <div className="flex items-center space-x-4 text-xs">
          <button
            type="button"
            className={`flex cursor-pointer items-center space-x-1 transition-colors hover:text-blue-600 ${
              isLiked ? 'font-bold text-blue-600' : ''
            }`}
            aria-label={`좋아요 ${likesCount}개`}
          >
            {/* TODO: 좋아요 아이콘 (예: SVG) */}
            <span>좋아요</span>
            {likesCount > 0 && <span className="font-medium">{likesCount}</span>}
          </button>

          {/* TODO: 답글 달기 기능 연결 (클릭 시 답글 입력창 토글) */}
          <button type="button" className="transition-colors cursor-pointer">
            <span>답글 달기</span>
          </button>

          {/* 답글이 있을 경우에만 '답글 N개' 버튼 표시 */}
          {repliesCount > 0 && (
            <button
              type="button"
              className="transition-colors cursor-pointer"
              onClick={() => setShowReplies(!showReplies)}
            >
              <span>{showReplies ? '답글 숨기기' : `답글 ${repliesCount}개`}</span>
            </button>
          )}
        </div>

        {/* 5. 답글 목록 (토글됨) */}
        {showReplies && replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {replies.map((reply) => (
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
