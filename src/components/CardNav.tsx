import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import NavSerachBar from '@/Layout/components/NavSerachBar';
import SearchIcon from '@/assets/icons/SearchIcon';
import ALogoBlack from '@/assets/images/ALogoBlack.svg';
import ALogoWhite from '@/assets/images/ALogoWhite.svg';
import GoArrowUpRight from '@/assets/images/Arrow_up-right.svg';
import { ROUTES } from '@/constants/routes';
import useThemeStore from '@/store/themeStore';
import useUserStore from '@/store/useUserStore';

export type CardNavLink = {
  label: string;
  to: string;
  ariaLabel: string;
  //외부링크 타고갈수있게 커스텀 optional
  isExternal?: boolean;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const theme = useThemeStore((s) => s.theme);
  const Logo = theme === 'dark' ? ALogoWhite : ALogoBlack;

  // --- ⬇️ 스크롤 감지 로직 추가 ⬇️ ---
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 페이지 최상단에서는 항상 표시 - 40정도...
      if (currentScrollY <= 40) {
        setIsVisible(true);
        // 아래로 스크롤하면 숨김
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // --- ⬆️ 스크롤 감지 로직 추가 ⬆️ ---

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    setIsHamburgerOpen(false);
    tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tl.reverse();
  }, [location]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const accessToken = useUserStore((s) => s.accessToken);

  const handleAuthButton = () => {
    if (accessToken) navigate(ROUTES.MYPAGE);
    else navigate(ROUTES.LOGIN);
  };

  return (
    <div
      // --- ⬇️ 동적 클래스 추가 ⬇️ ---
      // isVisible 상태에 따라 Y축 위치 변경, transition으로 부드러운 효과 적용
      // className={`card-nav-container fixed top-[1.2em] left-1/2 z-[99] w-[90%] max-w-[800px] -translate-x-1/2 transition-transform duration-300 ease-in-out md:top-[2em] ${
      className={`card-nav-container fixed top-0 left-0 z-[99] flex w-dvw items-center justify-center transition-transform duration-300 ease-in-out md:top-[2em] md:left-1/2 md:w-[90%] md:max-w-[800px] md:-translate-x-1/2 ${
        isVisible ? 'translate-y-0' : '-translate-y-[160%]' // 150%로 설정하여 확실히 화면 밖으로 이동
      } ${className}`}
      // --- ⬆️ 동적 클래스 추가 ⬆️ ---
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? 'open' : ''
        } relative block h-[60px] w-[90%] overflow-hidden rounded-xl p-0 will-change-[height] md:w-full md:shadow-md`}
        style={{ backgroundColor: baseColor }}
      >
        {/* 세개를 감싼 div */}
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-0 md:p-2 md:pl-[1.1rem]">
          {/* 검색&햄버거 */}
          <div className="order-2 flex items-center gap-3 md:order-1">
            <div
              className="md:hidden"
              onClick={
                isHamburgerOpen
                  ? () => {
                      return;
                    }
                  : toggleMenu
              }
            >
              <SearchIcon className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div
              className={`hamburger-menu ${
                isHamburgerOpen ? 'open' : ''
              } group mr-0 flex h-full cursor-pointer flex-col items-center justify-center gap-[6px]`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              style={{ color: menuColor || '#000' }}
            >
              <div
                className={`hamburger-line h-[2px] w-[30px] [transform-origin:50%_50%] bg-current transition-all duration-200 ease-linear ${
                  isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                } group-hover:opacity-75`}
              />
              <div
                className={`hamburger-line h-[2px] w-[30px] [transform-origin:50%_50%] bg-current transition-all duration-200 ease-linear md:hidden ${
                  isHamburgerOpen ? 'hidden' : ''
                } group-hover:opacity-75`}
              />
              <div
                className={`hamburger-line h-[2px] w-[30px] [transform-origin:50%_50%] bg-current transition-all duration-200 ease-linear ${
                  isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                } group-hover:opacity-75`}
              />
            </div>
          </div>

          {/* 로고&이름 */}
          <div className="logo-container order-1 flex items-center md:absolute md:top-1/2 md:left-1/2 md:order-2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Link to={'/'} className="flex items-center justify-center gap-1 md:gap-2">
              <img src={Logo} alt="로고" className="h-12" />
              <span className="font-archivo text-lg font-black tracking-tighter md:text-base md:font-semibold">
                LTK's ARCHIVE
              </span>
            </Link>
          </div>

          {/* 버튼 */}
          <button
            type="button"
            onClick={handleAuthButton}
            // md이상에서만 보임
            className="card-nav-cta-button hidden h-full cursor-pointer items-center justify-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 font-medium transition-colors duration-300 md:order-1 md:inline-flex"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {accessToken ? 'My Profile' : 'Get Started'}
          </button>
        </div>

        <div
          className={`card-nav-content absolute top-[60px] right-0 bottom-0 left-0 z-[1] flex flex-col items-stretch justify-start gap-2 p-2 ${
            isExpanded ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          } md:flex-row md:items-end md:gap-[12px]`}
          // aria-hidden={!isExpanded}
        >
          <div className="flex justify-between gap-2 md:hidden">
            <NavSerachBar />
            <button
              type="button"
              onClick={handleAuthButton}
              className="card-nav-cta-button inline-flex h-full cursor-pointer items-center justify-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 font-medium transition-colors duration-300"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {accessToken ? 'My Profile' : 'Get Started'}
            </button>
          </div>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] flex-col gap-2 rounded-[calc(0.75rem-0.2rem)] p-[12px_16px] select-none md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label text-[18px] font-normal tracking-[-0.5px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => {
                  // 공통 클래스 및 내부 요소 정의
                  const commonClasses =
                    'nav-card-link inline-flex cursor-pointer items-center gap-[6px] text-[15px] no-underline transition-opacity duration-300 hover:opacity-75 md:text-[16px]';

                  const content = (
                    <>
                      <img
                        src={GoArrowUpRight}
                        className="nav-card-link-icon h-4 shrink-0"
                        aria-hidden="true"
                      />
                      {lnk.label}
                    </>
                  );

                  // ✨ 분기 처리: 외부 링크면 <a>, 내부 링크면 <Link>
                  if (lnk.isExternal) {
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        href={lnk.to}
                        className={commonClasses}
                        aria-label={lnk.ariaLabel}
                        target="_blank" // 새 탭 열기
                        rel="noopener noreferrer" // 보안
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className={commonClasses}
                      to={lnk.to}
                      aria-label={lnk.ariaLabel}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
