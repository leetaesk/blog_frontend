import { useGetPostsLikedByMe } from '@/features/posts/archive/archive.hook';
import PostCard from '@/ui/Archive/components/PostCard';

/**
 * 좋아요 누른 게시글들
 * 페이지로 뺄까 고민 중
 */
const ArchiveLikedByMeSection = () => {
  const { data, isLoading, isError, error } = useGetPostsLikedByMe({ page: 1, limit: 12 });

  if (isError) return <>에러발생 : {error}</>;

  if (isLoading) return <>로딩 중...</>;

  if (!data) return <>데이터없음</>;

  return (
    <section className="bg-compWhite dark:bg-compDark mx-auto h-fit w-full max-w-4xl rounded-lg px-5 py-0 shadow-md sm:p-5 md:p-8">
      <div className="gap-2 md:grid md:grid-cols-3">
        {data.posts.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>
    </section>
  );
};

export default ArchiveLikedByMeSection;
