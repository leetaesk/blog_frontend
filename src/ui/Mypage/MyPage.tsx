import { useNavigate } from 'react-router-dom';

import ProfileImage from '@/components/ProfileImage';
import { useKakaoLogoutMutation } from '@/features/Auth/kakaoAuth.hook';
import useUserStore from '@/store/useUserStore';
import UpdateProfilePage from '@/ui/Mypage/components/UpdateProfilePage';

const MyPage = () => {
  const userInfo = useUserStore((s) => s.userInfo);
  const navigate = useNavigate();

  const { mutate: kakaoLogout } = useKakaoLogoutMutation();

  const handleLogout = () => {
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      kakaoLogout();
    }
  };

  if (!userInfo) {
    return <>로그인하고오세여</>; // 또는 null
  }

  return (
    <div className="bg-compWhite dark:bg-compDark mx-auto my-10 h-fit w-full max-w-4xl rounded-lg p-5 shadow-md">
      {/* 1. 프로필 정보 섹션 */}
      <section className="mb-10 flex items-center gap-4 border-b border-gray-200 pb-6 dark:border-gray-700">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <ProfileImage src={userInfo.profileImageUrl} alt={'프로필사진'} />
        </div>

        <div className="flex flex-col items-baseline">
          {/* [수정] dark:text-gray-100 -> dark:text-textWhite */}
          <h2 className="dark:text-textWhite text-3xl font-bold text-gray-800">
            {userInfo.nickname}
          </h2>
          <p className="mt-1 text-lg text-gray-500 capitalize dark:text-gray-400">
            {userInfo.role}
          </p>
        </div>
      </section>

      {/* 2. 메뉴 목록 섹션 */}
      <section>
        <ul className="space-y-2">
          {/* [수정] 텍스트 및 호버 색상 통일 */}
          <li
            className="cursor-pointer rounded-md p-4 text-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate('/mypage/edit-profile')}
          >
            프로필 수정
          </li>
          <UpdateProfilePage />
          <li
            className="cursor-pointer rounded-md p-4 text-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate('/mypage/posts')}
          >
            내가 쓴 글
          </li>
          <li
            className="cursor-pointer rounded-md p-4 text-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate('/mypage/comments')}
          >
            내가 쓴 댓글
          </li>
          <li
            className="cursor-pointer rounded-md p-4 text-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate('/mypage/liked-posts')}
          >
            좋아요 한 글
          </li>
        </ul>
      </section>

      {/* 3. 로그아웃 버튼 */}
      <div className="mt-10 border-t border-gray-200 pt-6 text-right dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="rounded-md border border-red-500 px-5 py-2 font-bold text-red-500 transition-colors duration-200 hover:bg-red-500 hover:text-white"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
