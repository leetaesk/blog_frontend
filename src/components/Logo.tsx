import CircularText from '@/components/CircularText';

const Logo = () => {
  return (
    <CircularText
      text="leetaesk*blog*tt*"
      onHover="pause"
      spinDuration={20}
      className="text-black h-full"
    />
  );
};

export default Logo;
