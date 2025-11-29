import { useGetCommentsCreatedByMe } from '@/features/comments/comments.hook';
import CommentCreatedByMe from '@/ui/Mypage/components/CommentCreatedByMe';

/**
 * '내가 작성한 댓글' 섹션 컴포넌트
 */
const CommentsCreatedByMeSection = () => {
  const { data, isLoading, isError } = useGetCommentsCreatedByMe();

  // 1. 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center text-gray-500 dark:text-gray-400">
        <p>댓글을 불러오는 중입니다...</p>
      </div>
    );
  }

  // 2. 에러 발생 UI
  if (isError || !data) {
    return (
      <div className="flex h-48 w-full items-center justify-center text-red-500">
        <p>댓글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 3. 데이터 성공적으로 로드
  const { comments = [], commentCount = 0 } = data || {};

  // 4. 작성한 댓글이 없는 경우 UI
  if (commentCount === 0) {
    return (
      <div className="flex h-48 w-full items-center justify-center text-gray-500 dark:text-gray-400">
        <p>작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  // 5. 댓글 목록 UI
  return (
    <section className="mx-auto w-full max-w-4xl md:pt-7">
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCreatedByMe comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentsCreatedByMeSection;
