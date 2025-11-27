import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import SkeletonPostCard from '@/ui/Archive/components/SkeletonPostCard';
import ScrollReveal from '@/ui/Main/components/ScrollReveal';

const RecentPostsSection = () => {
  const { data, isLoading } = useGetPosts({ page: 1, limit: 4 });

  const posts = data?.posts;

  if (isLoading)
    return (
      <section className="w-full py-24">
        <div className="mx-auto w-full px-4">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
            Recent Posts
          </h2>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => {
              return <SkeletonPostCard key={i} />;
            })}
          </div>
        </div>
      </section>
    );

  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full px-4">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          Recent Posts
        </h2>
        <ScrollReveal stagger>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {posts ? (
              posts?.map((post) => (
                // Archive에서 쓰는 PostCard.tsx있으나 데이터 달라서 걍 하드코딩한 듯
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <article className="bg-card group flex h-full transform flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                    {/* h-48 -> 모바일에서 36 */}
                    <div className="h-30 overflow-hidden sm:h-48">
                      <img
                        src={post.thumbnailUrl || undefined}
                        alt={`${post.title} 썸네일`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-grow flex-col p-3 sm:p-6">
                      <span className="text-primary text-sm font-medium">{post.category.name}</span>
                      <h3 className="text-card-foreground mt-1 line-clamp-3 flex-grow text-sm font-bold sm:mt-2 sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm sm:mt-4">{post.createdAt}</p>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              // Todo: 꾸미세요
              <>글 없음</>
            )}
          </div>
        </ScrollReveal>
        <div className="mt-12 text-center">
          <Link
            to="/archive"
            className="text-primary group inline-flex items-center font-medium hover:underline"
          >
            모든 글 보기 <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPostsSection;
