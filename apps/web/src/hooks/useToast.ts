import { useAtom } from "jotai";
import { useCallback } from "react";

import { toastState } from "@/store/toast/toastAtom";
import { ToastType } from "@/types/toast";
import { getRandomID } from "@/utils/etc";

export const useToast = () => {
  const [toastDataState, setToastDataState] = useAtom(toastState);

  const removeToast = useCallback(
    (toastID: ToastType["id"]) => setToastDataState((prev) => prev.filter((toast) => toast.id !== toastID)),
    [setToastDataState],
  );

  const emitToast = useCallback(
    (toast: Omit<ToastType, "id">) => {
      // 중복 메시지 체크
      const isDuplicate = toastDataState.some((existingToast) => existingToast.content === toast.content && existingToast.type === toast.type);

      if (!isDuplicate) {
        setToastDataState((prev) => [...prev, { ...toast, id: getRandomID() }]);
      }
    },
    [setToastDataState, toastDataState],
  );

  const toast = {
    success: (content: string) => emitToast({ type: "success", content }),
    error: (content: string) => emitToast({ type: "error", content }),
  };

  return { toast, toastDataState, emitToast, removeToast };
};
