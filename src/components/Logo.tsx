import CircularText from '@/components/CircularText';

const Logo = () => {
  return (
    <CircularText
      text="leetaesk*blog*tt*"
      onHover="pause"
      spinDuration={20}
      className="h-full text-black"
    />
  );
};

export default Logo;
