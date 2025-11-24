import { type ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';

import github from '@/assets/images/githubLogo.png';
import instagram from '@/assets/images/instagramLogo.png';
import threads from '@/assets/images/threadsLogo.png';
import velog from '@/assets/images/velogLogo.jpg';
import ModelViewer from '@/components/ModelViewer';
import ProjectSection from '@/ui/AboutMe/components/ProjectSection';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLink = ({ href, children, className }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank" // 새 탭에서 열기
      rel="noopener noreferrer" // 보안 필수 옵션 (성능 향상 + 보안)
      className={className}
    >
      {children}
    </a>
  );
};

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

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar = ({ skill, percentage }: SkillBarProps) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // 컴포넌트가 화면에 나타난 뒤 약간의 딜레이를 두고 width를 변경해야
    // CSS transition 애니메이션이 작동합니다.
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
      {/* 회색 배경 바 */}
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

const AboutMePage = () => {
  const mySkills = [
    { skill: 'JavaScript / TypeScript', percentage: 90 },
    { skill: 'React', percentage: 85 },
    { skill: 'TailwindCSS', percentage: 85 },
    { skill: 'Zustand, ReduxToolkit', percentage: 80 },
    { skill: 'Node.js & Express', percentage: 40 },
    { skill: 'PostgreSQL', percentage: 30 },
    { skill: 'AWS', percentage: 5 },
    { skill: 'Docker', percentage: 20 },
  ];
  return (
    <div className="font-archivo mb-8 w-full max-w-7xl p-4">
      <div className="flex justify-between gap-12">
        <div>
          <div className="my-4 border-l-2 border-gray-400 px-4">
            <h1 className="text-6xl font-bold">Lee Tae Seok</h1>
            <h2 className="text-2xl font-semibold">FrontEnd Developer</h2>
            <br />
            <div>
              <span>
                안녕하세요, 프론트엔드 개발자 이태석입니다. React와 Node.js, express를 사용하여 개인
                블로그를 만들었습니다. 트러블슈팅부터 개인적인 일상까지 글로 끄적여볼까 합니다.{' '}
                <br />
                모두에게는 아니겠지만, 단 한 사람에게라도 도움이 되었으면 합니다.
              </span>
            </div>
          </div>
          <div className="border-t p-4">
            <h2 className="text-xl font-bold italic">Contact me</h2>
            <br />
            <span className="grid grid-cols-[1fr_2fr] items-center gap-2">
              <span className="text-xl">☎️ Tel</span>
              <p>010-2563-5930</p>
              <span className="text-xl">✉️ E-mail</span>
              <span>leetaesuka@gmail.com</span>
              <div></div>
              <span>itasuk@naver.com</span>
              <span className="text-xl">🤝 Social</span>
              <div className="flex gap-2 pt-2">
                <ExternalLink
                  href={'https://instagram.com/ttttt_sk'}
                  children={<img src={instagram} aria-label="인스타" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://github.com/leetaesk'}
                  children={<img src={github} aria-label="깃허브" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://instagram.com'}
                  children={<img src={threads} aria-label="쓰레드" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://instagram.com'}
                  children={<img src={velog} aria-label="벨로그" className="h-9 w-9 rounded-xl" />}
                />
              </div>
            </span>
          </div>
        </div>
        <div>
          <ModelViewer
            url={
              'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb'
            }
            width={400}
            height={400}
            defaultRotationX={-50}
            defaultRotationY={20}
            environmentPreset="forest"
            autoRotate
            autoRotateSpeed={0.5}
            // maxZoomDistance={100}
            minZoomDistance={0.2}
            autoFrame
            // fadeIn
          />
        </div>
      </div>

      {/* 어바웃미 */}
      <div className="font-archivo text-foreground mt-12 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased">
        <SectionTitleBox>
          <div>
            <p className="text-4xl">About Me</p>
          </div>
          <div className="flex h-full items-end">
            <p>FRONTEND DEVELOPER</p>
          </div>
        </SectionTitleBox>
        {/* 여기에 스킬 바 섹션 추가! */}
        <div className="mt-8 px-4 text-left">
          <h3 className="mb-6 text-2xl">My Tech Stack</h3>

          {/* 반응형 그리드: 모바일은 1열, 큰 화면은 2열로 나오게 설정 */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
            {mySkills.map((item) => (
              <SkillBar key={item.skill} skill={item.skill} percentage={item.percentage} />
            ))}
          </div>
        </div>

        {/* 여기에 프로젝트 섹션 추가! */}
        <div className="mt-8 px-4 text-left">
          <h3 className="mb-6 text-2xl">My Projects</h3>

          <ProjectSection />
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
