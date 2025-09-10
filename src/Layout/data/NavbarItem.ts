import { ROUTES } from '@/constants/routes';

// 1. 변하지 않는 기본 메뉴 구조 정의
export const navItems = [
  {
    label: 'Archive',
    links: [
      { label: 'All Posts', to: ROUTES.ARCHIVE, ariaLabel: 'View all posts' },
      { label: 'By Category', to: '/archive', ariaLabel: 'Browse posts by category' },
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
