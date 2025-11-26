import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';

interface ProfileImageProps {
  src: string | null | undefined;
  alt: string;
}

/**
 * 프로필 이미지. null일 수 있는 profileImageUrl을 그대로 넣으세여
 * w랑 h full이라서 커버 씌우셈여 rounded같은 것도
 * @param src
 * @param alt
 */
const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  if (src) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />;
  }

  return (
    <div className="h-full w-full">
      <DefaultProfileIcon />;
    </div>
  );
};

export default ProfileImage;
