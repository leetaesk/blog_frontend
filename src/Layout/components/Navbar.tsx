import { useMemo } from 'react';

import { darkColors, lightColors, navItems } from '@/Layout/data/NavbarItem';
import logo from '@/assets/Arrow_up-right.svg';
import CardNav from '@/components/CardNav';
import useThemeStore from '@/store/themeStore';

const Navbar = () => {
  const theme = useThemeStore((state) => state.theme);

  const themedItems = useMemo(() => {
    // ... (이전과 동일)
    const colors = theme === 'dark' ? darkColors : lightColors;
    return navItems.map((item, index) => ({
      ...item,
      bgColor: colors[index].bgColor,
      textColor: colors[index].textColor,
    }));
  }, [theme]);

  return (
    <CardNav
      key={theme} // ✨ 이 부분을 추가합니다! 'light' 또는 'dark'
      logo={logo}
      logoAlt="Company Logo"
      items={themedItems}
      ease="power3.out"
      baseColor={theme === 'dark' ? '#333333' : '#fff'}
      menuColor={theme === 'dark' ? '#f9f9f9' : '#111'}
      buttonBgColor={theme === 'dark' ? '#f2f2f2' : '#111'}
      buttonTextColor={theme === 'dark' ? '#202020' : '#fff'}
    />
  );
};

export default Navbar;
