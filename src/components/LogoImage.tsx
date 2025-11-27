import ALogoBlack from '@/assets/images/ALogoBlack.svg';
import ALogoWhite from '@/assets/images/ALogoWhite.svg';
import useThemeStore from '@/store/themeStore';

/**
 * 다크모드에 따라 맞는 색깔 이미지 태그 리턴
 * @returns <img> 로고
 */
const LogoImage = () => {
  const isDark = useThemeStore((s) => s.theme) === 'dark';
  const Logo = isDark ? ALogoWhite : ALogoBlack;
  return <img src={Logo} alt="블로그로고" />;
};

export default LogoImage;
