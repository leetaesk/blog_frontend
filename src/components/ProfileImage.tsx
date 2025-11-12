import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';

interface ProfileImageProps {
  src: string | null;
  alt: string;
}

/**
 * 프로필 이미지.
 * w랑 h full이라서 커버 씌우셈여 rounded같은 것도
 */
const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  if (src) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />;
  }

  return <DefaultProfileIcon />;
};

export default ProfileImage;
