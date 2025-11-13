import { useGetPostsLikedByMe } from '@/features/posts/archive/archive.hook';
import PostCard from '@/ui/Archive/components/PostCard';

const ArchiveLikedByMeSection = () => {
  const { data, isLoading, isError, error } = useGetPostsLikedByMe({ page: 1, limit: 12 });

  if (isError) return <>에러발생 : {error}</>;

  if (isLoading) return <>로딩 중...</>;

  if (!data) return <>데이터없음</>;

  return (
    <section className="bg-compWhite dark:bg-compDark mx-auto h-fit w-full max-w-4xl rounded-lg p-5 shadow-md md:p-8">
      <div className="grid grid-cols-3 gap-2">
        {data.posts.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>
    </section>
  );
};

export default ArchiveLikedByMeSection;
