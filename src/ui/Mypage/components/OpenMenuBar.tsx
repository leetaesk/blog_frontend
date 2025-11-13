import type { Dispatch, ReactNode, SetStateAction } from 'react';

// 👈 1. ReactNode 추가

import clsx from 'clsx';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

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
        className="flex cursor-pointer items-center gap-4 rounded-md p-4 text-xl font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <ArrowRightIcon
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
