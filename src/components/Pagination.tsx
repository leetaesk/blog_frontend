interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onPageChange }: PaginationProps) => {
  // 렌더링할 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  // 유효성 검사: 전체 페이지가 1 이하이면 렌더링하지 않음
  if (totalPage <= 1) return null;

  return (
    <nav className="mt-12 flex justify-center" aria-label="페이지네이션">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* 이전 버튼 */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-compWhite border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite"
            aria-label="이전 페이지"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
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
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                currentPage === number
                  ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-gray-600 dark:bg-bgDark dark:text-textWhite'
                  : 'text-gray-500 bg-compWhite border border-gray-300 hover:bg-gray-100 dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite'
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
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-compWhite border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite"
            aria-label="다음 페이지"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
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
