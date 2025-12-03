import { useGetComments } from '@/features/comments/comments.hook';
import Comment from '@/ui/PostDetail/components/Comment';
import CommentForm from '@/ui/PostDetail/components/CommentForm';

interface CommentSectionProps {
  postId: number;
}

/**
 * 댓글 섹션
 * isError처리 안 하고 commentCount가 0일 때만 다른 거 렌더링
 * isLoading처리도 안 했음
 */
const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data: comments } = useGetComments({ postId });
  return (
    <div className="bg-compWhite dark:bg-compDark text-textDark dark:text-textWhite rounded-2xl p-6 shadow-xl sm:p-8 md:p-12">
      <h2 className="mb-3 text-xl font-semibold">
        댓글 <span className="font-black">{comments?.commentCount}</span>개
      </h2>
      <hr />
      {/* 댓글 */}
      {comments?.comments.map((com, idx) => {
        return <Comment postId={postId} comment={com} key={`${com.id} - ${idx}`} />;
      })}
      {/* 댓글작성폼 */}
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentSection;
