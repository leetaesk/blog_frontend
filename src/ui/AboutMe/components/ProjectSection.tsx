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
        <div className="flex items-center justify-center p-4 md:w-1/2">
          <img className="h-full object-cover" src={grapPt} alt="grabPT project screenshot" />
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <div className="text-primary text-sm font-semibold tracking-wide uppercase">
            Front-end Lead
          </div>
          <h3 className="text-card-foreground mt-1 text-2xl font-bold">grabPT</h3>
          <p className="text-muted-foreground mt-2">
            사용자 맞춤형 PT 트레이너 매칭 서비스. React와 TypeScript를 사용하여 인터랙티브한
            UI/UX를 설계하고 구현을 리드했습니다.
          </p>
          <div className="mt-4">
            <a
              rel="noopener"
              href="http://www.grabpt.com"
              target="_blank"
              className="text-primary group inline-flex items-center font-medium hover:underline"
            >
              사이트 방문하기 <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>

      {/* 내 블로그 */}
      <div className="bg-card mx-auto mt-8 h-64 max-w-4xl overflow-hidden rounded-xl shadow-lg md:flex">
        <div className="flex items-center justify-center p-4 md:w-1/2">
          <img
            className="h-full object-cover"
            src={BlogLogo}
            alt="Leeteesk's Archive Project Logo"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <div className="text-primary text-sm font-semibold tracking-wide uppercase">
            Personal Project
          </div>
          <h3 className="text-card-foreground mt-1 text-2xl font-bold">Leetaesk's ARCHIVE</h3>
          <p className="text-muted-foreground mt-2 font-medium">
            React, Node.JS와 Express를 활용하여 개인블로그를 제작했습니다.
          </p>
          <div className="mt-4">
            <Link
              to={ROUTES.HOME}
              className="text-primary group inline-flex items-center font-medium hover:underline"
            >
              사이트 방문하기 <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
