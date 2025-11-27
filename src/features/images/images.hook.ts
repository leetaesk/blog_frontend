import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { uploadImage } from '@/features/images/images.api';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onError: (err) => toast.error(`${err.message}`),
  });
};
