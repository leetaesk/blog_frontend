import { useGetComments } from '@/features/comments/comments.hook';
import Comment from '@/ui/PostDetail/components/Comment';
import CommentForm from '@/ui/PostDetail/components/CommentForm';

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data: comments } = useGetComments({ postId });
  return (
    <div className="bg-compWhite dark:bg-compDark text-textDark dark:text-textWhite rounded-2xl p-6 shadow-xl sm:p-8 md:p-12">
      {comments?.commentCount === 0 ? (
        // Todo: 이거꾸미셈
        <>댓글이 없습니다. 작성해보세요 </>
      ) : (
        comments?.comments.map((com, idx) => {
          return <Comment postId={postId} comment={com} key={`${com.id} - ${idx}`} />;
        })
      )}
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentSection;
