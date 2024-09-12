import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { api } from "@/api";

export function useApiUploadImage() {
  const uploadMutation = useMutation({
    mutationFn: async (imgUrl: File) => {
      const { data: presignedData } = await api.get<{ presignedUrl: string; imageUrl: string }>("/external/image/presigned?domain=SPACE");

      await axios.put(presignedData.presignedUrl, imgUrl, {
        headers: {
          "Content-Type": "image/png",
        },
      });

      return presignedData.imageUrl;
    },
  });

  return {
    uploadImage: uploadMutation.mutate,
    isLoading: uploadMutation.isPending,
    isError: uploadMutation.isError,
  };
}
