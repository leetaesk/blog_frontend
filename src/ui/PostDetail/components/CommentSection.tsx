import { useGetComments } from '@/features/comments/comments.hook';
import Comment from '@/ui/PostDetail/components/Comment';
import CommentForm from '@/ui/PostDetail/components/CommentForm';

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data: comments } = useGetComments({ postId });
  console.log(`comments:${comments}`);
  return (
    <div className="bg-compWhite dark:bg-compDark text-textDark dark:text-textWhite rounded-2xl p-6 shadow-xl sm:p-8 md:p-12">
      {comments?.commentCount === 0 ? (
        <>댓글없음 </>
      ) : (
        comments?.comments.map((comment) => {
          return <Comment postId={postId} comment={comment} key={comment.id} />;
        })
      )}
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentSection;
