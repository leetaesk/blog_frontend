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
        onClick={() => onClick((prev) => !prev)}
        className="text-textDark dark:text-textWhite flex cursor-pointer items-center gap-4 rounded-md p-4 text-2xl font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronRightIcon
          className={clsx('transition-transform duration-300 ease-in-out', isOpen && 'rotate-90')}
        />
        <p>{title}</p>
      </div>
      <div className={clsx(!isOpen && 'hidden')}>{children}</div>
    </>
  );
};

export default OpenMenuBar;
