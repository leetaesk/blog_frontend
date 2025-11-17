import { useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import type { CommentByUser } from '@/features/comments/comments.dto';
import CommentDeleteButton from '@/ui/PostDetail/components/CommentDeleteButton';
import CommentEditForm from '@/ui/PostDetail/components/CommentEditForm';
import CommentForm from '@/ui/PostDetail/components/CommentForm';
import { formatDate } from '@/utils/formatDate';

interface CommentProps {
  postId: number;
  comment: CommentByUser;
  isReply?: boolean;
}

export const Comment = ({ postId, comment, isReply = false }: CommentProps) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id, author, content, createdAt, likesCount, repliesCount, replies, isLiked, isOwner } =
    comment;

  // (추가) 답글 목록과 폼을 함께 토글하는 핸들러
  const handleToggleRepliesAndForm = () => {
    // 다음 상태를 미리 계산
    const nextShowState = !showReplies;
    // 답글 목록과 답글 폼의 상태를 동기화
    setShowReplies(nextShowState);
    setShowReplyForm(nextShowState);
  };

  return (
    <div className="flex space-x-3 border-b border-gray-100 py-4 last:border-b-0">
      {/* 1. 프로필 이미지 */}
      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
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
            {isOwner && (
              <div className="flex h-full justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="rounded-md bg-transparent px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
                  aria-label="댓글수정"
                >
                  수정
                </button>
                <CommentDeleteButton commentId={comment.id} />
              </div>
            )}
          </div>
        </div>

        {/* 3. 댓글 내용 */}
        {isEditing ? (
          <CommentEditForm
            commentId={id}
            originalContent={content}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <p className="mt-1 mb-2 text-sm whitespace-pre-wrap">{content}</p>
        )}

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

          {/* 1. 답글이 없는 경우: '답글 달기' 버튼 (폼만 토글) */}
          {!isReply && repliesCount === 0 && (
            <button
              type="button"
              className="cursor-pointer transition-colors"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <span>답글 달기</span>
            </button>
          )}

          {/* 2. 답글이 있는 경우: '답글 N개' 버튼 (목록과 폼을 함께 토글) */}
          {!isReply && repliesCount > 0 && (
            <button
              type="button"
              className="cursor-pointer transition-colors"
              onClick={handleToggleRepliesAndForm}
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
              // 답글에 isReply를 true로 넘겨 조건부렌더링
              <Comment postId={postId} key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}

        {/* (수정) 'onSuccess' 핸들러를 추가하여 답글 작성 완료 시 폼을 닫습니다. */}
        {showReplyForm && !isReply && (
          <CommentForm
            key={`replyCommentForm${id}`}
            postId={postId}
            parentCommentId={id}
            onSuccess={() => setShowReplyForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
