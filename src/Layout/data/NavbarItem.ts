// 1. 변하지 않는 기본 메뉴 구조 정의
export const navItems = [
  {
    label: 'Archive',
    links: [
      { label: 'All Posts', ariaLabel: 'View all posts' },
      { label: 'By Category', ariaLabel: 'Browse posts by category' },
    ],
  },
  {
    label: 'Projects',
    links: [
      { label: 'All Projects', ariaLabel: 'View all projects' },
      { label: 'My GitHub', ariaLabel: 'Visit my GitHub profile' },
    ],
  },
  {
    label: 'About & Contact',
    links: [
      { label: 'About Me', ariaLabel: 'Learn more about me' },
      { label: 'Email', ariaLabel: 'Send me an email' },
      { label: 'LinkedIn', ariaLabel: 'Connect on LinkedIn' },
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
