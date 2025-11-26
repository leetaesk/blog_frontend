import { axiosPrivateInstance } from '@/lib/axiosInstance';

/**
 * 이미지업로드 api
 * @param file
 * @returns imageUrl
 */
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axiosPrivateInstance.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.data.imageUrl as string;
};
