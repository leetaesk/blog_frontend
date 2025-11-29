import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import grapPt from '@/assets/images/GrabPTLogo.svg';
import LogoImage from '@/components/LogoImage';
import { ROUTES } from '@/constants/routes';

const ProjectSection = () => {
  return (
    <div className="mx-auto w-full">
      {/* 그랩피티 */}
      <div className="bg-card mx-auto flex h-40 max-w-4xl overflow-hidden rounded-xl shadow-lg sm:h-64">
        {/* 로고 안 짤리게 min-w 하드코딩 */}
        <div className="flex w-1/3 items-center justify-center py-4 sm:min-w-[150.76px]">
          <a
            rel="noopener"
            href="http://www.grabpt.com"
            target="_blank"
            className="text-primary group h-full object-cover font-medium group-hover:underline"
          >
            <img className="h-full object-contain" src={grapPt} alt="grabPT project screenshot" />
          </a>
        </div>
        <div className="flex w-2/3 flex-col gap-1 p-2 sm:gap-2 sm:p-7 lg:p-8">
          <h3 className="text-card-foreground mt-1 text-base leading-1 font-bold sm:text-3xl lg:text-4xl">
            grabPT <span className="font-normal">|</span>{' '}
            <span className="text-sm lg:text-xl">원하는 가격·방식으로 나만의 PT 매칭</span>
          </h3>
          <div className="text-primary text-xs font-semibold tracking-wide sm:text-sm">
            FRONT-END LEAD
          </div>
          <p className="text-muted-foreground mt-3 text-sm leading-4 sm:mt-2">
            <p className="text-[#003efb]">
              Grab the weight. <br />
              Grab the challenge. <br />
              Grab the life you deserve <br />
            </p>
          </p>
          <div className="group mt-4 hidden cursor-pointer items-center text-[1rem] sm:flex">
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
      <div className="bg-card mx-auto mt-8 flex h-40 max-w-4xl overflow-hidden rounded-xl shadow-lg sm:h-64">
        <div className="flex w-1/3 items-center justify-center py-4 sm:min-w-[150.76px]">
          <LogoImage className="h-full object-cover" />
        </div>
        <div className="flex w-2/3 flex-col gap-2 p-2 sm:p-7 lg:p-8">
          <h3 className="text-card-foreground mt-1 text-lg font-bold sm:text-3xl lg:text-4xl">
            Leetaesk's ARCHIVE
          </h3>
          <div className="text-primary text-sm font-semibold tracking-wide">Personal Project</div>
          <p className="text-muted-foreground mt-2 leading-4">
            React, Node.JS와 express를 활용하여 개인 블로그를 제작했습니다. <br />
            주로 기술적인 이야기를 다룹니다.
          </p>
          <div className="group mt-4 hidden cursor-pointer items-center text-[1rem] sm:flex">
            <Link className="text-primary group font-medium group-hover:underline" to={ROUTES.HOME}>
              사이트 방문하기
            </Link>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
