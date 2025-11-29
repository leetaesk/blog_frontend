import clsx from 'clsx';
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts ? (
              posts?.map((post) => (
                // Archive에서 쓰는 PostCard.tsx있으나 데이터 달라서 걍 하드코딩한 듯
                <Link to={`/posts/${post.id}`} key={post.id} className="block h-full">
                  <article
                    className={clsx(
                      // [공통 스타일] 배경, 오버플로우
                      'group bg-card h-full overflow-hidden',

                      // [Mobile] 가로 반전(텍스트-이미지), 리스트 스타일(border-b)
                      'flex flex-row-reverse items-start border-b border-gray-100 py-5 dark:border-gray-800',

                      // [PC md:] 세로 카드형, 쉐도우, 라운딩 효과
                      'md:flex-col md:items-stretch md:border-0 md:py-0',
                      'md:rounded-xl md:shadow-lg md:transition-transform md:duration-300 md:hover:-translate-y-2',
                    )}
                  >
                    {/* 썸네일 영역 */}
                    <div
                      className={clsx(
                        'flex-shrink-0 overflow-hidden',

                        // [Mobile] 우측 80px 정사각형 썸네일, 텍스트와 간격(ml-4)
                        'ml-4 h-20 w-20 rounded-lg',

                        // [PC md:] 상단 꽉 찬 이미지
                        'md:ml-0 md:h-48 md:w-full md:rounded-none',
                      )}
                    >
                      <img
                        src={post.thumbnailUrl || undefined}
                        alt={`${post.title} 썸네일`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* 텍스트 영역 */}
                    <div
                      className={clsx(
                        'flex flex-grow flex-col justify-between',

                        // [Mobile] 패딩 없음 (부모 py-5로 조절)
                        // [PC md:] 패딩 6 (p-6)
                        'md:p-6',
                      )}
                    >
                      {/* 카테고리 */}
                      <span className="text-primary text-xs font-medium md:text-sm">
                        {post.category.name}
                      </span>

                      {/* 제목 */}
                      <h3
                        className={clsx(
                          'text-card-foreground mt-1 line-clamp-2 font-bold',

                          // [Mobile] text-base (16px)
                          // [PC md:] text-lg (18px), 상단 여백 조금 더 줌
                          'text-base md:mt-2 md:text-lg',
                        )}
                      >
                        {post.title}
                      </h3>

                      {/* 날짜 */}
                      <p
                        className={clsx(
                          'text-muted-foreground mt-auto pt-2',

                          // [Mobile] text-xs
                          // [PC md:] text-sm, 상단 여백 추가
                          'text-xs md:mt-4 md:text-sm',
                        )}
                      >
                        {post.createdAt}
                      </p>
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
