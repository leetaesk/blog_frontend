import { cn } from '@/utils/utils';

interface ArrowRightIconProps {
  className?: string;
}

const ArrowRightIcon = ({ className }: ArrowRightIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn('ml-1 h-5 w-5 transition-transform group-hover:translate-x-1', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export default ArrowRightIcon;
