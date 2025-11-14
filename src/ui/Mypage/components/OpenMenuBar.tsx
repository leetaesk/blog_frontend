import type { Dispatch, ReactNode, SetStateAction } from 'react';

import clsx from 'clsx';

import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';

interface OpenMenuBarProps {
  title: string;
  isOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const OpenMenuBar = ({ title, isOpen, onClick, children }: OpenMenuBarProps) => {
  return (
    <>
      <div
        onClick={() => onClick((prev) => !prev)} // 👈 5. onClick 수정
        className="flex items-center gap-4 p-4 text-xl font-medium text-gray-700 transition-colors duration-200 rounded-md cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <ChevronRightIcon
          className={clsx(
            'transition-transform duration-300 ease-in-out', // transform에만 transition 적용
            isOpen && 'rotate-90',
          )}
        />
        <p>{title}</p>
      </div>
      <div className={clsx(!isOpen && 'hidden')}>
        {children} {/* 👈 6. <Outlet /> 대신 {children}을 렌더링 */}
      </div>
    </>
  );
};

export default OpenMenuBar;
