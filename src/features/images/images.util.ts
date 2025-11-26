import imageCompression from 'browser-image-compression';

/**
 * 이미지 압축 옵션 인터페이스
 */
interface CompressOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
}

/**
 * 이미지 파일 압축 유틸
 *
 * 기본 설정 (변경 가능):
 * - 최대 크기: 2MB
 * - 최대 해상도: 1920px (기존 800px -> FHD 기준 상향)
 * - 포맷: WebP로 변경
 *
 * @param file - 원본 이미지 파일
 * @param customOptions? - 압축 옵션 { maxSizeMB, maxWidthOrHeight }
 * @returns 압축된 File 객체 (Promise)
 */
export const compressImage = async (file: File, customOptions?: CompressOptions): Promise<File> => {
  const options = {
    maxSizeMB: customOptions?.maxSizeMB ?? 2, // default 2MB
    maxWidthOrHeight: customOptions?.maxWidthOrHeight ?? 1920, // default 1920px
    useWebWorker: true,
    fileType: 'image/webp', // WebP로 변환
    initialQuality: 0.8,
  };

  try {
    // 라이브러리 함수
    const compressedFile = await imageCompression(file, options);

    // 개발 모드 로그
    if (import.meta.env.DEV) {
      console.log(
        `📉 [${file.name}] 압축 결과: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
      );
    }

    return compressedFile;
  } catch (error) {
    throw error;
  }
};
