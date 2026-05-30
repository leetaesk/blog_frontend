import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';

interface ProfileImageProps {
  src: string | null | undefined;
  alt: string;
}

/**
 * http:// 이미지 URL을 https://로 업그레이드해 Mixed Content 경고를 막는다.
 * (카카오 등 외부 프로필 URL이 http로 내려오는 경우 대비. 해당 CDN들은 https도 지원)
 */
const toHttps = (url: string): string => url.replace(/^http:\/\//i, 'https://');

/**
 * 프로필 이미지. null일 수 있는 profileImageUrl을 그대로 넣으세여
 * w랑 h full이라서 커버 씌우셈여 rounded같은 것도
 * @param src
 * @param alt
 */
const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  if (src) {
    return <img src={toHttps(src)} alt={alt} className="h-full w-full object-cover" />;
  }

  return (
    <div className="h-full w-full">
      <DefaultProfileIcon />;
    </div>
  );
};

export default ProfileImage;
