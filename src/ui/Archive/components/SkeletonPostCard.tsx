const SkeletonPostCard = () => {
  return (
    <div className="bg-compWhite dark:bg-compDark flex h-full w-full transform flex-col overflow-hidden rounded-xl shadow-lg">
      {/* 썸네일 스켈레톤 */}
      <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700" />

      {/* 텍스트 박스 스켈레톤 */}
      <div className="flex flex-grow flex-col gap-3 p-6">
        {/* 카테고리 */}
        <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* 제목 (2줄) */}
        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-5/6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 요약 (3줄) */}
        <div className="flex-1 space-y-2 pt-2">
          <div className="h-3 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 날짜 및 댓글 수 */}
        <div className="flex items-center pt-2">
          <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
