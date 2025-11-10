import { useMemo } from 'react';

import { ROUTES } from '@/constants/routes';
import useUserStore from '@/store/useUserStore';

// navItems를 생성하는 로직을 컴포넌트가 아닌 커스텀 훅으로 분리
export const useNavItems = () => {
  // 훅은 다른 훅(useNavItems)이나 컴포넌트 안에서 호출해야 합니다. (규칙 준수!)
  const { userInfo } = useUserStore();
  const userRole = userInfo?.role;

  // userRole이 바뀔 때만 navItems 배열을 새로 계산하도록 useMemo 사용 (성능 최적화)
  const navItems = useMemo(() => {
    return [
      {
        label: 'Archive',
        links: [
          { label: 'All Posts', to: ROUTES.ARCHIVE, ariaLabel: 'View all posts' },
          { label: 'By Category', to: ROUTES.ARCHIVE, ariaLabel: 'Browse posts by category' },
          // 조건부 렌더링 로직은 그대로 사용
          ...(userRole === 'admin'
            ? [{ label: 'postpost', to: ROUTES.POST_CREATE, ariaLabel: 'create post' }]
            : []),
        ],
      },
      {
        label: 'Projects',
        links: [
          { label: 'All Projects', to: '/archive', ariaLabel: 'View all projects' },
          { label: 'My GitHub', to: '/archive', ariaLabel: 'Visit my GitHub profile' },
        ],
      },
      {
        label: 'About & Contact',
        links: [
          { label: 'Email', to: '/archive', ariaLabel: 'Send me an email' },
          { label: 'About Me', to: '/archive', ariaLabel: 'Learn more about me' },
          { label: 'LinkedIn', to: '/archive', ariaLabel: 'Connect on LinkedIn' },
        ],
      },
    ];
  }, [userRole]); // userRole이 변경될 때만 이 함수를 다시 실행합니다.

  return navItems;
};

// 2. 라이트 모드 색상 팔레트 (기존 색상)
export const lightColors = [
  { bgColor: '#0D0716', textColor: '#fff' },
  { bgColor: '#170D27', textColor: '#fff' },
  { bgColor: '#271E37', textColor: '#fff' },
];

// 3. 다크 모드 색상 팔레트 (Navbar #333 배경에 맞춰 조정)
export const darkColors = [
  { bgColor: '#444444', textColor: '#EAEAEA' },
  { bgColor: '#4D4D4D', textColor: '#EAEAEA' },
  { bgColor: '#555555', textColor: '#EAEAEA' },
];
