import { items } from '@/Layout/data/NavbarItem';
import logo from '@/assets/Arrow_up-right.svg';
import CardNav from '@/components/CardNav';
import useThemeStore from '@/store/themeStore';

const Navbar = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      ease="power3.out"
      // [수정] 새로운 #2b2b2b 기반 테마 색상으로 값 변경
      baseColor={theme === 'dark' ? '#333333' : '#fff'} // 카드 배경 (--card)
      menuColor={theme === 'dark' ? '#e8e8e8' : '#111'} // 메뉴 아이콘 (--foreground)
      buttonBgColor={theme === 'dark' ? '#e8e8e8' : '#111'} // 버튼 배경 (--primary, 구글 블루)
      buttonTextColor={theme === 'dark' ? '#212121' : '#fff'} // 버튼 텍스트 (--primary-foreground)
    />
  );
};

export default Navbar;
