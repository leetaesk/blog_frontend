import { type ChangeEvent, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/lib/axiosInstance';

// --- API 통신 함수 ---
// 컴포넌트 바깥에 API 호출 함수를 분리하는 것이 좋은 습관입니다.
const uploadImageAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); // 'image' 키는 서버와 동일해야 함

  // Axios 요청: 성공하면 response.data가 반환됩니다.
  const { data } = await axiosInstance.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // 서버 응답이 { message, data: { imageUrl } } 형식이므로, imageUrl을 직접 반환
  return data.data.imageUrl as string;
};

function ImageUploader() {
  // --- 상태 관리 ---
  // UI 상호작용 관련 상태만 남기고, 서버 상태는 TanStack Query가 관리합니다.
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- TanStack Query 뮤테이션 ---
  // 이미지 업로드(Create)는 useMutation을 사용합니다.
  const {
    mutate, // 이 함수를 호출하여 API 요청을 실행합니다.
    data: imageUrl, // 성공 시 API가 반환한 데이터 (여기서는 imageUrl)
    isPending, // 로딩 상태 (isLoading의 새 이름)
    isError, // 에러 발생 여부
    error, // 발생한 에러 객체
  } = useMutation({
    mutationFn: uploadImageAPI, // API 요청을 실행할 함수
    onSuccess: () => {
      // 성공 시 추가로 실행할 작업 (예: 알림 띄우기)
      console.log('이미지 업로드 성공!');
    },
    onError: (err: AxiosError) => {
      // 실패 시 추가로 실행할 작업 (예: 에러 로깅)
      console.error('뮤테이션 에러:', err.response?.data);
    },
  });

  // --- 이벤트 핸들러 ---
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TanStack Query의 mutate 함수를 호출하여 업로드를 시작합니다.
    // isLoading, isError, data 상태는 자동으로 업데이트됩니다.
    mutate(file);
  };

  const handleCopyUrl = async () => {
    if (!imageUrl) return;
    await navigator.clipboard.writeText(imageUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mx-auto my-6 max-w-xl rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
      <h4 className="mb-4 text-lg font-semibold">이미지 업로더</h4>

      <input
        type="file"
        aria-label="이미지업로더"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* 커스텀 버튼 */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-block cursor-pointer rounded-lg bg-blue-500 px-6 py-2 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isPending}
      >
        {isPending ? '업로드 중...' : '이미지 선택'}
      </button>

      {/* 상태 메시지 표시 */}
      <div className="mt-4 h-5 text-sm">
        {isError && (
          <p className="text-red-500">
            ❌ 업로드 실패: {error?.message || '서버에 문제가 발생했습니다.'}
          </p>
        )}
      </div>

      {/* 업로드 성공 시 결과 표시 */}
      {imageUrl && (
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
          <p className="font-semibold text-green-600">✅ 업로드 성공!</p>
          <img
            src={imageUrl}
            alt="업로드된 이미지 미리보기"
            className="my-3 max-h-60 w-full rounded object-contain"
          />

          <div className="mt-2 flex items-center rounded-md bg-gray-200 p-2">
            <p className="mr-3 flex-grow overflow-x-auto font-mono text-xs whitespace-nowrap text-gray-700">
              {imageUrl}
            </p>
            <button
              onClick={handleCopyUrl}
              className="flex-shrink-0 rounded-md border border-gray-400 bg-white px-3 py-1 text-sm transition hover:bg-gray-100"
            >
              {isCopied ? '복사됨!' : '복사'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
