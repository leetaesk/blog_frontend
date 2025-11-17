import { useState } from 'react';

import type { patchCommentRequestDto } from '@/features/comments/comments.dto';
import { usePatchComment } from '@/features/comments/comments.hook';

interface CommentEditFormProps {
  commentId: number;
  originalContent: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CommentEditForm = ({
  commentId,
  originalContent,
  onSuccess,
  onCancel,
}: CommentEditFormProps) => {
  const [content, setContent] = useState(originalContent);

  const { mutate: patchComment, isPending } = usePatchComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    // (개선) 원본과 내용이 같으면 API 호출 없이 성공 처리
    if (content.trim() === originalContent.trim()) {
      console.log('내용이 변경되지 않아 폼을 닫습니다.');
      onSuccess();
      return;
    }

    if (isPending) return;

    const params: patchCommentRequestDto = {
      commentId,
      content,
    };

    patchComment(params, {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 w-full">
      <textarea
        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition-shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글 내용"
        disabled={isPending} // 로딩 중일 때 입력 방지
        aria-label="댓글 수정"
      />
      <div className="mt-2 flex justify-end space-x-2">
        {/* 취소 버튼 */}
        <button
          type="button" // (중요) submit이 되면 안 됨
          onClick={onCancel} // 부모에게 받은 onCancel 콜백 실행
          disabled={isPending}
          className="focus:ring-opacity-75 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        >
          취소
        </button>

        {/* 저장 버튼 */}
        <button
          type="submit"
          className="focus:ring-opacity-75 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isPending}
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
};

export default CommentEditForm;
