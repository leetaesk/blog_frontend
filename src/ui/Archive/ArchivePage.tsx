import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import { useDebounce } from '@/hooks/useDebounce';
import ArchiveSideBar from '@/ui/Archive/components/CategorySideBar';
import PostCard from '@/ui/Archive/components/PostCard';
import SearchSideBar from '@/ui/Archive/components/SearchSideBar';
import SkeletonPostCard from '@/ui/Archive/components/SkeletonPostCard';

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. URL에서 값 가져오기 (API 요청의 기준값)
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');
  const urlSearchQuery = searchParams.get('search') || '';

  // 2. [UI State] 입력창 표시용 (즉각 반응)
  // 초기값을 URL 파라미터로 설정하여 새로고침해도 검색어 유지
  const [inputValue, setInputValue] = useState<string>(urlSearchQuery);

  // 3. 뒤로가기 등으로 URL이 밖에서 변했을 때, 입력창도 동기화
  useEffect(() => {
    setInputValue(urlSearchQuery);
  }, [urlSearchQuery]);

  // 4. [Debounce] 0.3초 뒤에 URL을 변경하는 함수
  const debouncedUpdateUrl = useDebounce((query: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }

    // ★ 검색어가 바뀌면 무조건 1페이지로 리셋
    newSearchParams.set('page', '1');

    setSearchParams(newSearchParams);
  }, 300);

  // 5. [Handler] 자식에게 내려줄 함수
  const handleSearchChange = (newValue: string) => {
    // UI는 즉시 변경 (렉 없음)
    setInputValue(newValue);
    // URL 변경은 천천히 (API 요청 제어)
    debouncedUpdateUrl(newValue);
  };

  // 6. [API Hook] URL 파라미터(urlSearchQuery)를 감지하여 자동 호출
  const { posts, pagination, isLoading, isError, error } = useGetPosts({
    page,
    limit: 12,
    category: category || undefined,
    search: urlSearchQuery, // inputValue가 아니라 이걸 넣어야 함!
  });

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  if (isError) {
    return <div className="flex h-screen items-center justify-center">Error: {error?.message}</div>;
  }

  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen w-full max-w-6xl">
      <div className="mx-auto w-full py-12">
        <header className="mb-12 text-center">
          <h1 className="font-archivo text-right text-2xl font-extrabold tracking-tight md:text-4xl">
            LEETAESK'S ARCHIVE
          </h1>
        </header>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full min-w-48 md:w-1/3 2xl:w-1/4">
            <div className="sticky top-24 space-y-8">
              <SearchSideBar searchValue={inputValue} setSearchValue={handleSearchChange} />
              <ArchiveSideBar />
            </div>
          </aside>

          {/* Main Content: Post Grid */}
          <main className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => <SkeletonPostCard key={index} />)
              ) : posts && posts.length > 0 ? (
                posts.map((post) => <PostCard post={post} key={post.id} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">게시글이 없습니다.</p>
              )}
            </div>

            {/* Pagination */}
            {pagination && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPage={pagination.totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
