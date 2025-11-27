import { useEffect, useState } from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar = ({ skill, percentage }: SkillBarProps) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // 컴포넌트가 화면에 나타난 뒤 약간의 딜레이를 두고 width를 변경해야
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 200); // 0.2초 뒤 실행

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="mb-5">
      <div className="mb-1 flex justify-between px-1">
        <span className="text-base font-medium">{skill}</span>
        <span className="text-sm">{percentage}%</span>
      </div>
      {/* 배경 바 */}
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        {/* 실제 데이터 바 (애니메이션 적용) */}
        <div
          className="h-2.5 rounded-full bg-gray-800 transition-all duration-1000 ease-out dark:bg-gray-200"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
