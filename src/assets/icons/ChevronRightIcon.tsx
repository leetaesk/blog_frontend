import clsx from 'clsx';

interface ChevronRightIconProps {
  className?: string;
}

/**
 * > 이케 생긴 새끼
 * 색 바꾸고 싶으면 text-넘기셈
 * @param className
 */
const ChevronRightIcon = ({ className }: ChevronRightIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx('h-6 w-6', className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};

export default ChevronRightIcon;
