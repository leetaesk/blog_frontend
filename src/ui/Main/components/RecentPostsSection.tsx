import clsx from 'clsx';
import { AlertCircle, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import SkeletonPostCard from '@/ui/Archive/components/SkeletonPostCard';
import ScrollReveal from '@/ui/Main/components/ScrollReveal';

const RecentPostsSection = () => {
  const { data, isLoading, isError, refetch } = useGetPosts({ page: 1, limit: 4 });

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

  if (isError)
    return (
      <section className="w-full py-24">
        <div className="mx-auto w-full px-4">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
            Recent Posts
          </h2>
          <div className="relative overflow-hidden rounded-xl select-none">
            {/* 배경에 깔릴 가짜 콘텐츠 (블러 처리될 요소) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <DummyErrorPostCard key={i} />
              ))}
            </div>

            {/* 블러 처리 및 에러 메시지 오버레이 */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[4px] dark:bg-black/60">
              <AlertCircle className="mb-4 h-12 w-12 text-red-500 drop-shadow-md" />
              <h3 className="text-foreground mb-2 text-xl font-bold drop-shadow-md">
                게시글을 불러오지 못했습니다
              </h3>
              <p className="text-muted-foreground mb-6 font-medium drop-shadow-md">
                일시적인 오류가 발생했습니다.
                <br />
                잠시 후 다시 시도해주세요.
              </p>
              <button
                onClick={() => refetch()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <RefreshCw className="h-4 w-4" />
                다시 시도
              </button>
            </div>
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
            {posts && posts.length > 0 ? (
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
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center opacity-70">
                <FileText className="text-muted-foreground mb-4 h-12 w-12 opacity-50" />
                <p className="text-muted-foreground text-lg font-medium">
                  아직 작성된 글이 없습니다.
                </p>
              </div>
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

// 에러 시 보여줄 가짜(Dummy) 카드 컴포넌트
const DummyErrorPostCard = () => {
  return (
    <div className="block h-full cursor-default">
      <article
        className={clsx(
          'group bg-card h-full overflow-hidden',
          'flex flex-row-reverse items-start border-b border-gray-100 py-5 dark:border-gray-800',
          'md:flex-col md:items-stretch md:border-0 md:py-0',
          'md:rounded-xl md:shadow-lg',
        )}
      >
        {/* 가짜 썸네일 (회색 박스) */}
        <div
          className={clsx(
            'flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800',
            'ml-4 h-20 w-20 rounded-lg',
            'md:ml-0 md:h-48 md:w-full md:rounded-none',
          )}
        />

        {/* 가짜 텍스트 영역 */}
        <div
          className={clsx(
            'flex flex-grow flex-col justify-between',
            // [Mobile] 패딩 없음 (부모 py-5로 조절)
            // [PC md:] 패딩 6 (p-6)
            'md:p-6',
          )}
        >
          {/* 가짜 카테고리 */}
          <span className="text-primary/40 text-xs font-medium md:text-sm">Category</span>

          {/* 가짜 제목 */}
          <h3
            className={clsx(
              'text-card-foreground/40 mt-1 line-clamp-2 font-bold',
              'text-base md:mt-2 md:text-lg',
            )}
          >
            게시글 제목이 들어갈 자리입니다. 길이가 길어지면 두 줄까지 표시됩니다.
          </h3>

          {/* 가짜 날짜 */}
          <p
            className={clsx('text-muted-foreground/40 mt-auto pt-2', 'text-xs md:mt-4 md:text-sm')}
          >
            2024. 01. 01
          </p>
        </div>
      </article>
    </div>
  );
};

export default RecentPostsSection;
