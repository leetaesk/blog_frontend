import { z } from 'zod';

// 10MB 파일 사이즈 제한
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(20, '닉네임은 20자 이하이어야 합니다.')
    .optional(),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      `이미지 파일 크기는 10MB를 초과할 수 없습니다.`,
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      '지원되지 않는 파일 형식입니다. (jpeg, png, webp만 가능)',
    ),
  profileAction: z.enum(['delete', 'use_kakao']).optional(),
});

// ⭐️ 폼 값 타입을 zod 스키마로부터 추론 (UpdateProfileFormValues와 동일)
export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
