import clsx from 'clsx';

const SkeletonPostCard = () => {
  return (
    <div
      className={clsx(
        // 기본 및 모바일 (리스트형, 이미지 우측 배치를 위한 reverse)
        'group bg-compWhite dark:bg-compDark flex h-full w-full flex-row-reverse items-start overflow-hidden py-5',
        'border-b border-gray-100 dark:border-gray-800',

        // PC (카드형, 세로 배치)
        'md:flex-col md:items-stretch md:rounded-xl md:border-0 md:py-0 md:shadow-lg',
      )}
    >
      {/* 썸네일 스켈레톤 */}
      <div
        className={clsx(
          'animate-pulse bg-gray-200 dark:bg-gray-700',

          // 모바일: 80px 정사각형, 둥근 모서리, 텍스트와 간격
          'ml-4 h-20 w-20 flex-shrink-0 rounded-lg',

          // PC: 상단 꽉 채움, 직각 모서리
          'md:ml-0 md:h-48 md:w-full md:rounded-none',
        )}
      />

      {/* 텍스트 박스 스켈레톤 */}
      <div
        className={clsx(
          'flex flex-grow flex-col justify-between',

          // 모바일: 패딩 없음
          // PC: 패딩 및 내부 간격 추가
          'md:gap-3 md:px-6 md:py-3',
        )}
      >
        {/* 카테고리 */}
        <div className="mb-2 h-4 w-1/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* 제목 (2줄) */}
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded-md bg-gray-200 md:h-6 dark:bg-gray-700" />
          <div className="h-5 w-5/6 animate-pulse rounded-md bg-gray-200 md:h-6 dark:bg-gray-700" />
        </div>

        {/* 요약 (PC에서만 3줄 느낌, 모바일은 좁아서 조금만 보여줌) */}
        <div className="mt-3 flex-1 space-y-2">
          <div className="h-3 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 날짜 및 댓글 수 */}
        <div className="mt-3 flex items-center">
          <div className="h-3 w-1/3 animate-pulse rounded-md bg-gray-200 md:h-4 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
