import useScrollToTop from '@/hooks/useScrollToTop';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onPageChange }: PaginationProps) => {
  useScrollToTop(currentPage);
  // 렌더링할 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  // 유효성 검사: 전체 페이지가 1 이하이면 렌더링하지 않음
  if (totalPage <= 1) return null;

  return (
    <nav className="mt-12 flex justify-center" aria-label="페이지네이션">
      <ul className="flex h-10 items-center -space-x-px text-base">
        {/* 이전 버튼 */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-compWhite dark:bg-compDark dark:hover:bg-bgDark dark:hover:text-textWhite ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 px-4 leading-tight text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:text-gray-400"
            aria-label="이전 페이지"
          >
            <span className="sr-only">Previous</span>
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

        {/* 페이지 숫자 버튼 */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              aria-current={currentPage === number ? 'page' : undefined}
              className={`flex h-10 items-center justify-center px-4 leading-tight ${
                currentPage === number
                  ? 'dark:bg-bgDark dark:text-textWhite z-10 border border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-gray-600'
                  : 'bg-compWhite dark:bg-compDark dark:hover:bg-bgDark dark:hover:text-textWhite border border-gray-300 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* 다음 버튼 */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
            className="bg-compWhite dark:bg-compDark dark:hover:bg-bgDark dark:hover:text-textWhite flex h-10 items-center justify-center rounded-e-lg border border-e-0 border-gray-300 px-4 leading-tight text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:text-gray-400"
            aria-label="다음 페이지"
          >
            <span className="sr-only">Next</span>
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
