import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import { ScrollReveal } from '@/ui/Main/MainPage';

const RecentPostsSection = () => {
  const { data, isLoading } = useGetPosts({ page: 1, limit: 4 });

  if (isLoading)
    return <div className="text-muted-foreground py-24 text-center">Loading posts...</div>;

  const posts = data?.posts;

  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full px-4">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          Recent Posts
        </h2>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts ? (
              posts?.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <article className="bg-card group flex h-full transform flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.thumbnailUrl || undefined}
                        alt={`${post.title} 썸네일`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-grow flex-col p-6">
                      <span className="text-primary text-sm font-medium">{post.category.name}</span>
                      <h3 className="text-card-foreground mt-2 flex-grow text-lg font-bold">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mt-4 text-sm">{post.createdAt}</p>
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
