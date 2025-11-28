import { memo } from 'react';

interface SearchSideBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchSideBar = ({ searchValue, setSearchValue }: SearchSideBarProps) => {
  return (
    // 모바일 패딩 삭제
    // -> 모바일 그냥 삭제로 변경 ? => p반응형 삭제
    <div className="bg-compWhite dark:bg-compDark hidden rounded-xl p-6 shadow-lg sm:block dark:shadow-none">
      <h3 className="text-textDark dark:text-textWhite mb-4 text-lg font-bold">검색</h3>
      <input
        type="search"
        name="검색창"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색어를 입력해주세요"
        // 글씨가 16px이하면 iOS는 자동 확대 -> 16px로 고정
        className="bg-secondWhite text-textDark w-full rounded-lg border-2 border-transparent py-2 pr-2 pl-4 text-[16px] transition-all duration-300 placeholder:text-gray-400 focus:border-gray-200 focus:ring-0 focus:outline-none sm:text-xs"
      />
    </div>
  );
};

export default memo(SearchSideBar);
