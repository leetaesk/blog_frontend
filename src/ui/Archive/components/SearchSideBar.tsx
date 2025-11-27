import { memo } from 'react';

interface SearchSideBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchSideBar = ({ searchValue, setSearchValue }: SearchSideBarProps) => {
  return (
    <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg dark:shadow-none">
      <h3 className="text-textDark dark:text-textWhite mb-4 text-lg font-bold">검색</h3>
      <input
        type="search"
        name="검색창"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색어를 입력해주세요"
        className="bg-secondWhite text-textDark w-full rounded-lg border-2 border-transparent py-2 pr-2 pl-4 text-xs transition-all duration-300 placeholder:text-gray-400 focus:border-gray-200 focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

export default memo(SearchSideBar);
