import { confirm } from '@/components/ConfirmToast';
import { useDeleteComment } from '@/features/comments/comments.hook';

interface CommentDeleteButtonProps {
  commentId: number;
}

const CommentDeleteButton = ({ commentId }: CommentDeleteButtonProps) => {
  const { mutate: deleteComment, isPending } = useDeleteComment();

  const handleDeleteClick = async () => {
    if (isPending) return; // 중복 클릭 방지

    const result = await confirm(
      '정말 이 댓글을 삭제하시겠습니까?\n답글이 있는 경우, 답글도 함께 삭제됩니다.',
      '삭제',
      '취소',
    );

    if (result) {
      return;
    }

    deleteComment({ commentId });
  };

  return (
    <button
      type="button"
      onClick={handleDeleteClick}
      disabled={isPending}
      className="rounded-md bg-transparent px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
      aria-label="댓글 삭제"
    >
      {isPending ? '삭제 중...' : '삭제'}
    </button>
  );
};

export default CommentDeleteButton;
