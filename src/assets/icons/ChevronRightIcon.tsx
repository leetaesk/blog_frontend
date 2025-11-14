import React from 'react';

import clsx from 'clsx';

interface ChevronRightIconProps {
  className?: string; // Tailwind CSS 클래스를 받아서 적용할 수 있게 합니다.
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor" // Tailwind CSS의 text-color를 따르게 하려면 여기를 제거하거나 current-color로 설정
      className={clsx('h-6 w-6', className)} // 기본 크기를 Tailwind CSS로 설정하고, 추가 클래스 적용
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};

export default ChevronRightIcon;
