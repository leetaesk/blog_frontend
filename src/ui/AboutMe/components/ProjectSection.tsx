import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import AlogoBlack from '@/assets/images/ALogoBlack.svg';
import AlogoWhite from '@/assets/images/ALogoWhite.svg';
import grapPt from '@/assets/images/GrabPTLogo.svg';
import { ROUTES } from '@/constants/routes';
import useThemeStore from '@/store/themeStore';

const ProjectSection = () => {
  const isDark = useThemeStore((s) => s.theme) === 'dark';
  const BlogLogo = isDark ? AlogoWhite : AlogoBlack;
  return (
    <div className="mx-auto w-full px-4">
      {/* 그랩피티 */}
      <div className="bg-card mx-auto h-64 max-w-4xl overflow-hidden rounded-xl shadow-lg md:flex">
        <div className="flex items-center justify-center p-4 md:w-1/3">
          <img className="h-full object-cover" src={grapPt} alt="grabPT project screenshot" />
        </div>
        <div className="flex flex-col gap-2 p-8 md:w-2/3">
          <h3 className="text-card-foreground mt-1 text-4xl font-bold">
            grabPT <span className="font-normal">|</span>{' '}
            <span className="text-xl">원하는 가격·방식으로 나만의 PT 매칭</span>
          </h3>
          <div className="text-primary text-sm font-semibold tracking-wide">FRONT-END LEAD</div>
          <p className="text-muted-foreground mt-2 leading-4">
            사용자 맞춤형 PT 트레이너 매칭 서비스. <br /> React와 TypeScript를 사용하여 인터랙티브한
            UI/UX를 설계하고 구현을 리드했습니다.
          </p>
          <div className="group mt-4 flex cursor-pointer items-center text-[1rem]">
            <a
              rel="noopener"
              href="http://www.grabpt.com"
              target="_blank"
              className="text-primary group font-medium group-hover:underline"
            >
              사이트 방문하기
            </a>
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      {/* 내 블로그 */}
      <div className="bg-card mx-auto mt-8 h-64 max-w-4xl overflow-hidden rounded-xl shadow-lg md:flex">
        <div className="flex items-center justify-center p-4 md:w-1/3">
          <img
            className="h-full object-cover"
            src={BlogLogo}
            alt="Leeteesk's Archive Project Logo"
          />
        </div>
        <div className="flex flex-col gap-2 p-8 md:w-2/3">
          <h3 className="text-card-foreground mt-1 text-4xl font-bold">Leetaesk's ARCHIVE</h3>
          <div className="text-primary text-sm font-semibold tracking-wide">Personal Project</div>
          <p className="text-muted-foreground mt-2 leading-4">
            React, Node.JS와 express를 활용하여 개인 블로그를 제작했습니다. <br />
            빌드부터 배포까지 전 과정을 직접 제작해씀
          </p>
          <div className="group mt-4 flex cursor-pointer items-center text-[1rem]">
            <a
              rel="noopener"
              href="http://www.grabpt.com"
              target="_blank"
              className="text-primary group font-medium group-hover:underline"
            >
              사이트 방문하기
            </a>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
