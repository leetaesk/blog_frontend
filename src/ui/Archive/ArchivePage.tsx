import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import { useDebounce } from '@/hooks/useDebounce';
import CategorySideBar from '@/ui/Archive/components/CategorySideBar';
import PostCard from '@/ui/Archive/components/PostCard';
import SearchSideBar from '@/ui/Archive/components/SearchSideBar';
import SkeletonPostCard from '@/ui/Archive/components/SkeletonPostCard';

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. URL 파라미터 가져오기
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');
  const urlSearchQuery = searchParams.get('search') || '';

  // 2. 검색창 input
  const [inputValue, setInputValue] = useState<string>(urlSearchQuery);

  useEffect(() => {
    setInputValue(urlSearchQuery);
  }, [urlSearchQuery]);

  const debouncedUpdateUrl = useDebounce((query: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) newSearchParams.set('search', query);
    else newSearchParams.delete('search');

    newSearchParams.set('page', '1'); // 검색 시 1페이지 리셋
    setSearchParams(newSearchParams);
  }, 300);

  const handleSearchChange = (newValue: string) => {
    setInputValue(newValue);
    debouncedUpdateUrl(newValue);
  };

  // 3. API Hook
  const { data, isLoading, isError, error } = useGetPosts({
    page,
    limit: 12,
    category: category || undefined,
    search: urlSearchQuery,
  });

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  // 로딩 중이 아닐 때만 에러 화면을 보여줍니다.
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error?.message || '게시글을 불러올 수 없습니다.'}
      </div>
    );
  }

  // 5. 데이터 할당 (옵셔널 체이닝 필수)
  // isLoading일 때 data는 undefined이므로 안전하게 접근
  const posts = data?.posts || [];
  const pagination = data?.pagination;

  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen w-full max-w-6xl">
      {/* 모바일에서 py 삭제 */}
      <div className="mx-auto w-full py-0 sm:py-12">
        {/* 모바일에서 헤더 삭제 */}
        <header className="mb-12 hidden text-center sm:block">
          <h1 className="font-archivo text-right text-2xl font-extrabold tracking-tight sm:text-4xl">
            LEETAESK'S ARCHIVE
          </h1>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
          {/* Sidebar */}
          <aside className="w-full min-w-48 sm:w-1/3 2xl:w-1/4">
            <div className="sticky top-24 space-y-8">
              <SearchSideBar searchValue={inputValue} setSearchValue={handleSearchChange} />
              <CategorySideBar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {/* isLoading이 true이면 스켈레톤을 보여줍니다.
                isLoading이 false이고 데이터가 있으면 카드를 보여줍니다.
              */}
              {isLoading ? (
                Array.from({ length: 12 }).map((_, index) => <SkeletonPostCard key={index} />)
              ) : posts.length > 0 ? (
                posts.map((post) => <PostCard post={post} key={post.id} />)
              ) : (
                <p className="col-span-full py-20 text-center text-gray-500">
                  게시글이 존재하지 않습니다.
                </p>
              )}
            </div>

            {/* Pagination */}
            {/* 로딩 중이 아니고 페이지네이션 데이터가 있을 때만 표시 */}
            {!isLoading && pagination && (
              <div className="my-8 mt-4 sm:mt-12">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPage={pagination.totalPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
