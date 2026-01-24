import clsx from 'clsx';

const DummyErrorPostCard = () => {
  return (
    <div className="block h-full cursor-default select-none">
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

export default DummyErrorPostCard;
