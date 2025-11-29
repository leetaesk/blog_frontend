import { useEffect, useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import { useUpdateMyProfile } from '@/features/users/users.hook';
import { type UpdateProfileSchemaType, updateProfileSchema } from '@/features/users/users.schema';
import useUserStore from '@/store/useUserStore';

const UpdateProfileSection = () => {
  const userInfo = useUserStore((s) => s.userInfo);

  const [imagePreview, setImagePreview] = useState<string | null>(
    userInfo?.profileImageUrl || null,
  );

  const [nickname, setNickname] = useState(userInfo?.nickname || '');
  const [imageFile, setImageFile] = useState<FileList | null | undefined>(undefined);
  const [profileAction, setProfileAction] = useState<'delete' | 'use_kakao' | undefined>(undefined);

  const [errors, setErrors] = useState<{
    nickname?: string;
    image?: string;
  }>({});

  const { mutate: updateProfileMutate, isPending } = useUpdateMyProfile();

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const newPreviewUrl = URL.createObjectURL(file);
      setImagePreview(newPreviewUrl);

      //  새 파일이 업로드되면, 'profileAction'은 초기화
      setProfileAction(undefined);

      // 컴포넌트 언마운트 또는 URL 변경 시 메모리 해제
      return () => {
        URL.revokeObjectURL(newPreviewUrl);
      };
    }
  }, [imageFile]); // [변경] 의존성 배열을 'imageFile'로 변경

  // [변경] 6. 폼 제출 핸들러 (RHF의 handleSubmit/resolver 대신 수동 처리)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 방지
    if (isPending) return;

    // 6-1. Zod 스키마로 폼 값 수동 검사
    const payload = {
      nickname: nickname,
      image: imageFile,
      profileAction: profileAction,
    };
    const validationResult = updateProfileSchema.safeParse(payload);

    // 6-2. 유효성 검사 실패 시: 에러 상태 업데이트
    if (!validationResult.success) {
      // Zod 에러를 RHF의 'errors' 객체와 유사한 형태로 변환
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        nickname: fieldErrors.nickname?.[0],
        image: fieldErrors.image?.[0],
      });
      return; // 폼 제출 중단
    }

    // 6-3. 유효성 검사 성공 시: 에러 초기화 및 뮤테이션 호출
    setErrors({});

    updateProfileMutate(validationResult.data as UpdateProfileSchemaType, {
      onSuccess: (data) => {
        // 폼 상태를 서버에서 받은 최신 정보로 수동 리셋
        setNickname(data.nickname);
        setImageFile(undefined);
        setProfileAction(undefined);
        // 에러 메시지 초기화
        setErrors({});
        // 이미지 미리보기도 서버 응답 URL로 업데이트
        setImagePreview(data.profileImageUrl);
      },
    });
  };

  // [변경] 7. "카카오 프로필 사용" 버튼 핸들러
  const handleSetKakaoProfile = () => {
    // [변경] RHF의 setValue 대신 setState 사용
    setProfileAction('use_kakao');
    setImageFile(undefined);
    // 미리보기 이미지를 스토어의 '카카오 원본' URL로 변경
    setImagePreview(userInfo?.kakaoProfileImageUrl || null);
  };

  // [변경] 8. "이미지 삭제" 버튼 핸들러
  const handleDeleteProfile = () => {
    // [변경] RHF의 setValue 대신 setState 사용
    setProfileAction('delete');
    setImageFile(undefined);
    // 미리보기를 null (기본 이미지)로 변경
    setImagePreview(null);
  };

  // 9. 취소 버튼 핸들러 (기존 로직 동일)
  const handleCancel = () => {
    setNickname(userInfo?.nickname || '');
    setProfileAction(undefined);
    setImageFile(undefined);
    // 미리보기를 null (기본 이미지)로 변경
    setImagePreview(userInfo?.profileImageUrl || null);
  };

  if (!userInfo) {
    return <div className="dark:text-textWhite p-10 text-center">사용자 정보를 불러오는 중...</div>;
  }

  // [변경] RHF의 isSubmitting 대신 isPending만 사용
  const isMutationLoading = isPending;

  return (
    <div className="bg-compWhite dark:bg-compDark mx-auto h-fit w-full max-w-4xl rounded-lg p-5 shadow-md md:p-8">
      {/* 폼 태그 */}
      {/* [변경] RHF의 handleSubmit 제거, 기본 onSubmit 연결 */}
      <form onSubmit={onSubmit}>
        {/* 페이지 제목
        <h2 className="hidden pb-4 mb-8 text-3xl font-bold text-gray-800 border-b border-gray-200 dark:text-textWhite sm:block dark:border-gray-700">
          프로필 수정
        </h2> */}
        {/* 1. 프로필 이미지 섹션 */}
        <section className="mb-10 flex items-center justify-between gap-5 sm:flex-col">
          {/* 이미지 미리보기 */}
          <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-gray-300 dark:border-gray-600">
            <ProfileImage src={imagePreview} alt="프로필 미리보기" />
          </div>

          {/* 이미지 변경 버튼 그룹 */}
          <div className="text-bold font-archivo flex flex-col justify-end gap-3 sm:flex-row sm:justify-center">
            {/* [변경] RHF의 register 대신 수동 onChange 연결 */}
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => setImageFile(e.target.files)}
              disabled={isMutationLoading}
            />
            {/* 파일 업로드 버튼 */}
            <label
              htmlFor="profileImageInput"
              className={`cursor-pointer rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                isMutationLoading
                  ? 'cursor-not-allowed bg-gray-400 text-gray-100'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              새 이미지 업로드
            </label>

            {/* (버튼 로직 동일) */}
            <button
              type="button"
              onClick={handleSetKakaoProfile}
              disabled={isMutationLoading}
              className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              카카오 프로필 사용
            </button>
            <button
              type="button"
              onClick={handleDeleteProfile}
              disabled={isMutationLoading}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              이미지 삭제
            </button>
          </div>
          {/* [유지] 에러 표시는 동일하게 'errors' 상태 사용 */}
          {errors.image && <p className="mt-2 text-sm text-red-500">{errors.image}</p>}
        </section>
        {/* 2. 닉네임 섹션 */}
        <section className="sm:mb-10">
          <label
            htmlFor="nickname"
            className="mb-2 block text-lg font-medium text-gray-800 dark:text-gray-200"
          >
            닉네임
          </label>
          {/* [변경] RHF의 register 대신 'value'와 'onChange' 수동 연결 */}
          <input
            id="nickname"
            type="text"
            className={`w-full rounded-md border p-3 dark:bg-gray-800 dark:text-white ${
              errors.nickname
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600'
            }`}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isMutationLoading}
          />
          {/* [유지] 에러 표시는 동일하게 'errors' 상태 사용 */}
          {errors.nickname && <p className="mt-2 text-sm text-red-500">{errors.nickname}</p>}
        </section>
        {/* 3. 액션 버튼 섹션 (기존 로직 동일) */}
        <section className="flex justify-end gap-4 border-t border-gray-200 pt-4 sm:pt-6 dark:border-gray-700">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isMutationLoading}
            className="rounded-md bg-gray-200 px-6 py-2 font-bold text-gray-800 transition-colors duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isMutationLoading}
            className="rounded-md bg-blue-600 px-6 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMutationLoading ? '저장 중...' : '저장'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default UpdateProfileSection;
