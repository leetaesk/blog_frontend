import { memo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import SearchIcon from '@/assets/icons/SearchIcon';
import { ROUTES } from '@/constants/routes';

// 경로 상수 import 확인

const NavSearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');

  // 검색 실행 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    const query = searchValue.trim();

    if (!query) return;

    setSearchValue('');
    navigate(`${ROUTES.ARCHIVE}?search=${encodeURIComponent(query)}&page=1`);
    return;
  };

  return (
    <div className="bg-compWhite dark:bg-compDark flex-1 rounded-xl shadow-lg dark:shadow-none">
      {/* form 태그 사용 이유: 
        모바일 키패드의 'Enter' 또는 'Go(이동)' 버튼을 눌렀을 때도 
        onSubmit 이벤트가 발생하여 handleSearch가 실행됩니다.
      */}
      <form onSubmit={handleSearch} className="relative flex w-full items-center">
        <input
          type="search"
          name="keyword"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          // pr-2 -> pr-10 변경: 우측 버튼 공간 확보
          className="bg-secondWhite text-textDark w-full rounded-lg border-2 border-transparent py-2 pr-10 pl-4 text-[16px] transition-all duration-300 placeholder:text-gray-400 focus:border-gray-200 focus:outline-none"
        />

        {/* 검색 버튼 (absolute로 우측 배치) */}
        <button
          type="submit"
          className="absolute right-3 text-gray-400 transition-colors hover:text-indigo-600"
          aria-label="검색하기"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default memo(NavSearchBar);
