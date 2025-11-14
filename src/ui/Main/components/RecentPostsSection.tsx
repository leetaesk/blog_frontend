import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import { ScrollReveal } from '@/ui/Main/MainPage';

const RecentPostsSection = () => {
  const { posts, isLoading } = useGetPosts({ page: 1, limit: 4 });

  if (isLoading)
    return <div className="py-24 text-center text-muted-foreground">Loading posts...</div>;

  return (
    <section className="w-full py-24">
      <div className="w-full px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-foreground md:text-4xl">
          Recent Posts
        </h2>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts?.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <article className="flex flex-col h-full overflow-hidden transition-transform duration-300 transform shadow-lg bg-card group rounded-xl hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.thumbnailUrl || undefined}
                      alt={`${post.title} 썸네일`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <span className="text-sm font-medium text-primary">{post.category.name}</span>
                    <h3 className="flex-grow mt-2 text-lg font-bold text-card-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground">{post.createdAt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </ScrollReveal>
        <div className="mt-12 text-center">
          <Link
            to="/archive"
            className="inline-flex items-center font-medium text-primary group hover:underline"
          >
            모든 글 보기 <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPostsSection;
