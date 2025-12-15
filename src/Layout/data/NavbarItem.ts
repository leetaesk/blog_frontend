import { useMemo } from 'react';

import { ROUTES } from '@/constants/routes';
import useUserStore from '@/store/useUserStore';

// 1. 사용할 타입 정의 (다른 파일에서 import 해서 쓸 수도 있게 export)
export interface NavLinkItem {
  label: string;
  to: string;
  ariaLabel: string;
  isExternal?: boolean; // 아까 추가한 외부 링크 구분값 (선택적)
}

export interface NavSection {
  label: string;
  links: NavLinkItem[];
}

export interface ColorTheme {
  bgColor: string;
  textColor: string;
}

// navItems를 생성하는 로직을 컴포넌트가 아닌 커스텀 훅으로 분리
export const useNavItems = (): NavSection[] => {
  // 훅은 다른 훅(useNavItems)이나 컴포넌트 안에서 호출해야 합니다. (규칙 준수!)
  const { userInfo } = useUserStore();
  const userRole = userInfo?.role;

  // userRole이 바뀔 때만 navItems 배열을 새로 계산하도록 useMemo 사용 (성능 최적화)
  const navItems = useMemo(() => {
    return [
      {
        label: '📰 Archive',
        links: [
          { label: 'All Posts', to: ROUTES.ARCHIVE, ariaLabel: 'View all posts' },
          // 조건부 렌더링 로직은 그대로 사용
          ...(userRole === 'admin'
            ? [{ label: 'postpost', to: ROUTES.POST_CREATE, ariaLabel: 'create post' }]
            : []),
        ],
      },
      {
        label: 'About Me',
        links: [
          { label: 'Portfolio', to: ROUTES.ABOUTME, ariaLabel: 'Learn more about me' },
          {
            label: 'GitHub',
            to: 'https://github.com/leetaesk',
            ariaLabel: 'Visit my GitHub profile',
            isExternal: true,
          },
        ],
      },
      {
        label: 'Contact Me',
        links: [
          {
            label: 'Email',
            // mailto는 유지하되, 불편하면 아래 오픈채팅을 메인으로 쓰세요.
            to: 'mailto:leetaesk@gmail.com',
            ariaLabel: 'Send email',
            isExternal: true,
          },
          {
            label: 'Phone',
            to: 'tel:010-2563-5930',
            ariaLabel: 'Call me',
            isExternal: true,
          },
          {
            label: 'KakaoTalk',
            to: 'https://open.kakao.com/o/sKgmfG6h',
            ariaLabel: 'KakaoTalk Open Chat',
            isExternal: true,
          },
        ],
      },
    ];
  }, [userRole]); // userRole이 변경될 때만 이 함수를 다시 실행합니다.

  return navItems;
};

// 2. 라이트 모드 색상 팔레트 (기존 색상)
export const lightColors: ColorTheme[] = [
  { bgColor: '#0D0716', textColor: '#fff' },
  { bgColor: '#170D27', textColor: '#fff' },
  { bgColor: '#271E37', textColor: '#fff' },
];

// 3. 다크 모드 색상 팔레트 (Navbar #333 배경에 맞춰 조정)
export const darkColors: ColorTheme[] = [
  { bgColor: '#444444', textColor: '#EAEAEA' },
  { bgColor: '#4D4D4D', textColor: '#EAEAEA' },
  { bgColor: '#555555', textColor: '#EAEAEA' },
];
