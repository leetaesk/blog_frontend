import { items } from '@/Layout/data/NavbarItem';
import logo from '@/assets/Arrow_up-right.svg';
import CardNav from '@/components/CardNav';

const Navbar = () => {
  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Navbar;
