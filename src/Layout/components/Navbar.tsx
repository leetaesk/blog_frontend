import { useMemo } from 'react';

import { darkColors, lightColors, useNavItems } from '@/Layout/data/NavbarItem';
import CardNav from '@/components/CardNav';
import useThemeStore from '@/store/themeStore';

const Navbar = () => {
  const theme = useThemeStore((state) => state.theme);
  const navItems = useNavItems();

  const themedItems = useMemo(() => {
    const colors = theme === 'dark' ? darkColors : lightColors;
    return navItems.map((item, index) => ({
      ...item,
      bgColor: colors[index].bgColor,
      textColor: colors[index].textColor,
    }));
  }, [theme, navItems]);

  return (
    <CardNav
      key={theme} //key로 theme을 지정해서 theme 바뀔떄마다 리렌더링
      items={themedItems}
      ease="power3.out"
      menuColor={theme === 'dark' ? '#f9f9f9' : '#111'}
      buttonBgColor={theme === 'dark' ? '#f2f2f2' : '#111'}
      buttonTextColor={theme === 'dark' ? '#202020' : '#fff'}
    />
  );
};

export default Navbar;
