import { type ChangeEvent, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import imageCompression from 'browser-image-compression';

// 👈 1. 라이브러리 import

import { axiosPrivateInstance } from '@/lib/axiosInstance';

// --- API 통신 함수 ---
const uploadImageAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axiosPrivateInstance.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.data.imageUrl as string;
};

// --- 이미지 압축 헬퍼 함수 ---
// 👈 2. 단일 파일 압축을 위한 헬퍼 함수 (컴포넌트 외부)
const compressImage = async (file: File): Promise<File> => {
  console.log(`📁 원본 파일: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    // browser-image-compression은 Blob을 반환하므로 File 객체로 변환해야 합니다.
    // 마지막 인자로 파일 이름을 전달하면 File 객체가 반환됩니다.
    // fileType을 지정하면 원본과 다른 포맷으로도 압축 가능합니다. (예: PNG -> JPEG)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(
      `📁 압축된 파일: ${compressedFile.name} (${(compressedFile.size / 1024 / 1024).toFixed(2)} MB)`,
    );
    console.log(`📊 압축률: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);
    return compressedFile;
  } catch (error) {
    console.error('이미지 압축에 실패했습니다.', error);
    // 에러가 발생하면 원본 파일을 그대로 반환하거나, 에러를 던져서 처리할 수 있습니다.
    // 여기서는 에러를 다시 던져서 상위에서 처리하도록 합니다.
    throw error;
  }
};

const ImageUploader = () => {
  // --- 상태 관리 ---
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false); // 👈 3. 압축 중 상태 추가
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- TanStack Query 뮤테이션 ---
  const {
    mutate,
    data: imageUrl,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: uploadImageAPI,
    onSuccess: () => {
      console.log('이미지 업로드 성공!');
    },
    onError: (err: AxiosError) => {
      console.error('뮤테이션 에러:', err.response?.data);
    },
  });

  // --- 이벤트 핸들러 ---
  // 👈 4. 파일 변경 핸들러를 async/await으로 수정
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsCompressing(true); // 압축 시작

    try {
      // 업로드 전 이미지 압축
      const compressedFile = await compressImage(file);

      // 압축된 파일로 mutate 함수 호출
      mutate(compressedFile);
    } catch (err) {
      console.error('압축 과정에서 에러가 발생했습니다.', err);
      // 사용자에게 에러 알림을 보여주는 로직을 추가할 수 있습니다.
    } finally {
      setIsCompressing(false); // 압축 종료 (성공/실패 무관)
    }
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

      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-block cursor-pointer rounded-lg bg-blue-500 px-6 py-2 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isCompressing || isPending} // 👈 5. 압축 중이거나 업로드 중일 때 비활성화
      >
        {/* 👈 6. 상태에 따라 버튼 텍스트 변경 */}
        {isCompressing ? '압축 중...' : isPending ? '업로드 중...' : '이미지 선택'}
      </button>

      {/* ... (이하 동일한 JSX) ... */}
      <div className="mt-4 h-5 text-sm">
        {isError && (
          <p className="text-red-500">
            ❌ 업로드 실패: {error?.message || '서버에 문제가 발생했습니다.'}
          </p>
        )}
      </div>

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
};

export default ImageUploader;
