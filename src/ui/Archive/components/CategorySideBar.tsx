import { Link, useSearchParams } from 'react-router-dom';

import { useGetCategories } from '@/features/category/category.hook';

const CategorySideBar = () => {
  const { data: categories, isLoading, isError } = useGetCategories();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  // 활성화 상태에 따른 공통 클래스
  const commonLinkClasses =
    'flex items-center justify-between text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400';
  // 모바일에서는 검은 글씨+밑줄 -> 웹에서는 보라색 텍스트
  const activeLinkClasses =
    'font-bold text-black sm:border-0 border-b-2 border-black dark:border-white sm:text-indigo-600 sm:dark:text-indigo-400';

  if (isLoading) {
    return (
      <div className="bg-background md:dark:bg-compDark rounded-xl p-6 shadow-lg dark:shadow-none">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <div className="space-y-3">
          <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-background md:dark:bg-compDark rounded-xl p-6 shadow-lg dark:shadow-none">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <p className="text-red-500">카테고리를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    // 모바일 패딩 삭제, rounded 삭제, 그림자 줄이기
    <div className="bg-background md:dark:bg-compDark p-0 shadow-sm sm:rounded-xl sm:p-6 sm:shadow-lg dark:shadow-none">
      <h3 className="mb-4 hidden text-xl font-bold sm:block">카테고리</h3>
      {/* 모바일에서 좌우로 넘기기 */}
      {/* 모바일에서는 gap, p날리고 Link 박스로 간격 맞추기  */}
      <ul className="scrollbar-hide flex gap-0 overflow-x-auto p-0 whitespace-nowrap sm:flex-col sm:space-y-2 sm:overflow-x-visible sm:whitespace-normal">
        <li className="flex-shrink-0">
          {' '}
          {/* 👈 중요: 찌그러짐 방지 */}
          <Link
            to="/archive"
            className={`px-3 py-2 text-lg sm:p-0 sm:text-base ${commonLinkClasses} ${!currentCategory ? activeLinkClasses : ''}`}
          >
            <span>전체</span>
            {/* 모바일에서 제거 */}
            <span className="ml-2 hidden text-sm font-light sm:inline">
              {' '}
              {/* 숫자와 간격 살짝 줌 */}
              {categories?.reduce((acc: any, cur: any) => acc + cur.postCount, 0)}
            </span>
          </Link>
        </li>

        {categories?.map((cat: any) => (
          // 모바일에서 글자 키우기
          <li key={cat.id} className="flex-shrink-0">
            <Link
              to={`/archive?category=${cat.name}`}
              className={`px-3 py-2 text-lg sm:p-0 sm:text-base ${commonLinkClasses} ${
                currentCategory === cat.name ? activeLinkClasses : ''
              }`}
            >
              <span>{cat.name}</span>
              <span className="ml-2 hidden text-sm font-light sm:inline">{cat.postCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySideBar;
