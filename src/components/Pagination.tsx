import clsx from 'clsx';

import useScrollToTop from '@/hooks/useScrollToTop';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

/**
 * 페이지네이션. 페이지1이하면 렌더링 안됨
 */
const Pagination = ({ currentPage, totalPage, onPageChange }: PaginationProps) => {
  useScrollToTop(currentPage);

  const limit: number = 5;

  // 1. 현재 페이지가 속한 그룹(Block) 계산 (예: 1~5페이지는 1그룹, 6~10페이지는 2그룹)
  const currentBlock = Math.ceil(currentPage / limit);

  // 2. 현재 그룹의 시작 페이지 번호 (예: 2그룹이면 6)
  const startPage = (currentBlock - 1) * limit + 1;

  // 3. 현재 그룹의 끝 페이지 번호 (예: 2그룹이면 10, 단 totalPage를 넘지 않음)
  const endPage = Math.min(startPage + limit - 1, totalPage);

  // 4. 렌더링할 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // 유효성 검사: 전체 페이지가 1 이하이면 렌더링하지 않음
  if (totalPage <= 1) return null;

  return (
    <nav className="mt-12 flex justify-center" aria-label="페이지네이션">
      <ul className="flex h-10 items-center -space-x-px text-base">
        {/* 이전 그룹 버튼 */}
        <li>
          <button
            onClick={() => onPageChange((currentBlock - 1) * limit)}
            disabled={currentPage <= limit}
            className={clsx(
              'ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 px-4 leading-tight',
              'bg-compWhite border-gray-300 text-gray-500 hover:bg-gray-100',
              'dark:bg-compDark dark:hover:bg-bgDark dark:hover:text-textWhite dark:border-gray-600 dark:text-gray-400',
              'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
              currentPage <= limit && 'cursor-none',
            )}
            aria-label="이전 페이지 그룹"
          >
            <span className="sr-only">Previous Group</span>
            <svg
              className="h-3 w-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {/* --- 페이지 숫자 버튼 --- */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              aria-current={currentPage === number ? 'page' : undefined}
              className={clsx(
                'relative box-border flex h-10 cursor-pointer items-center justify-center border px-4 leading-tight transition-colors duration-200',
                currentPage === number
                  ? 'z-10 border-gray-300 bg-gray-200 text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-white'
                  : 'dark:bg-compDark border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              )}
            >
              {number}
            </button>
          </li>
        ))}

        {/* 다음 그룹 버튼 */}
        <li>
          <button
            onClick={() => onPageChange(currentBlock * limit + 1)}
            disabled={endPage === totalPage} // 마지막 페이지가 보이면 비활성화
            className={clsx(
              'ms-0 flex h-10 items-center justify-center rounded-e-lg border px-4 leading-tight',
              'bg-compWhite border-gray-300 text-gray-500 hover:bg-gray-100',
              'dark:bg-compDark dark:hover:bg-bgDark dark:hover:text-textWhite dark:border-gray-600 dark:text-gray-400',
              'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
              endPage === totalPage && 'cursor-none',
            )}
            aria-label="다음 페이지 그룹"
          >
            <span className="sr-only">Next Group</span>
            <svg
              className="h-3 w-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
