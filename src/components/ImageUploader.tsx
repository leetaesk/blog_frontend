import { type ChangeEvent, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { useUploadImage } from '@/features/images/images.hook';
import { compressImage } from '@/features/images/images.util';

/**
 * 이미지업로더 컴포넌트
 * s3 업로드 후 ur반환해줌
 */
const ImageUploader = () => {
  // --- 상태 관리 ---
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const { mutate, isPending } = useUploadImage();

  /** 파일 압축 및 업로드 함수 */
  /**
   * 파일 압축 및 업로드 함수
   * @param file
   * @returns 없음
   */
  const processAndUploadFile = async (file: File) => {
    // 파일 없으면 리턴
    if (!file) return;

    // 이미지 파일이 아니면 처리 중단
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    //압축시작
    setIsCompressing(true);
    try {
      //압축 후 전송
      const compressedFile = await compressImage(file);
      //전송훅 실행. 동기임에 주의
      mutate(compressedFile, {
        onSuccess: (imageUrl) => {
          setUploadedImages((prev) => [...prev, imageUrl]);
          setSelectedImageUrl(imageUrl);
          setIsCopied(false);
        },
      });
    } catch (error) {
      // 비동기인 compressImage만 여기 catch블록에서 잡히고, mutate 에러는 중앙으로 넘어감
      // error 가 Error타입이 아닐 수 있음 -> type Narrowing
      if (error instanceof Error) {
        toast.error(`압축 실패: ${error.message}`);
      } else {
        // 에러가 Error 객체가 아닐 경우 (매우 드묾)
        toast.error('압축 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsCompressing(false);
    }
  };

  /** 파일 선택(input) 핸들러 */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
      // 동일한 파일을 다시 선택해도 onChange가 발생하도록 값 초기화
      event.target.value = '';
    }
  };

  /** 클립보드 붙여넣기 핸들러 */
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processAndUploadFile(file);
          event.preventDefault();
          return;
        }
      }
    }
  };

  /** URL 복사 핸들러 */
  const handleCopyUrl = async () => {
    if (!selectedImageUrl) return;
    await navigator.clipboard.writeText(selectedImageUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  /** 목록에서 이미지 클릭 핸들러 */
  const handleListImageClick = (url: string) => {
    setSelectedImageUrl(url);
    setIsCopied(false); // 복사 상태 초기화
  };

  return (
    <div
      className="mx-auto my-6 max-w-xl rounded-lg border-2 border-dashed border-gray-300 p-6 text-center outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
      onPaste={handlePaste} // 붙여넣기 이벤트 바인딩
      tabIndex={0} // div가 포커스(및 paste 이벤트)를 받을 수 있도록 설정
      aria-label="이미지 업로더. 클릭하여 파일을 선택하거나, 이미지 복사 후 여기에 붙여넣으세요."
    >
      <h4 className="mb-4 text-lg font-semibold">이미지 업로더</h4>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        aria-label="이미지업로더"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*" // 이미지 파일만 받도록 제한
      />

      {/* 파일 선택 버튼 */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-block cursor-pointer rounded-lg bg-blue-500 px-6 py-2 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isCompressing || isPending}
      >
        {isCompressing ? '압축 중...' : isPending ? '업로드 중...' : '이미지 선택'}
      </button>

      <p className="mt-2 text-sm text-gray-500">(또는 스크린샷/이미지 복사 후 여기에 붙여넣기)</p>

      {/* 선택된 이미지 미리보기 및 URL 복사 */}
      {selectedImageUrl && (
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
          <p className="font-semibold text-green-600">
            ✅ {uploadedImages.includes(selectedImageUrl) ? '이미지 선택됨' : '업로드 성공!'}
          </p>
          <img
            src={selectedImageUrl}
            alt="선택된 이미지 미리보기"
            className="my-3 max-h-60 w-full rounded object-contain"
          />
          <div className="mt-2 flex items-center rounded-md bg-gray-200 p-2">
            <p className="mr-3 flex-grow overflow-x-auto font-mono text-xs whitespace-nowrap text-gray-700">
              {selectedImageUrl}
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

      {/* 업로드된 이미지 목록 */}
      {uploadedImages.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4 text-left">
          <h5 className="text-md mb-3 font-semibold">업로드된 목록 ({uploadedImages.length}개)</h5>
          <ul className="flex flex-wrap gap-2">
            {uploadedImages.map((url) => (
              <li key={url}>
                <button
                  onClick={() => handleListImageClick(url)}
                  className={`block h-20 w-20 rounded-md border-2 p-1 transition ${
                    selectedImageUrl === url
                      ? 'border-blue-500 ring-2 ring-blue-300' // 선택된 항목 강조
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={url}
                    alt="업로드된 썸네일"
                    className="h-full w-full rounded object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
