import type { ReactNode } from 'react';

import clsx from 'clsx';

interface SectionTitleBoxProps {
  children: ReactNode;
}

const SectionTitleBox = ({ children }: SectionTitleBoxProps) => {
  return (
    <div
      className={clsx(
        // 1. 기본 레이아웃
        'relative grid grid-cols-2 gap-6 py-2 text-left',

        // 2. 상단 그라데이션 선 (Before)
        'before:absolute before:top-0 before:left-0 before:h-[3px] before:w-full',
        'before:bg-gradient-to-r before:from-gray-600 before:to-transparent',

        // 3. 하단 그라데이션 선 (After)
        'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full',
        'after:bg-gradient-to-r after:from-gray-600 after:to-transparent',

        // 4. 다크모드
        'before:dark:from-gray-400 after:dark:from-gray-400',
      )}
    >
      {children}
    </div>
  );
};

export default SectionTitleBox;
