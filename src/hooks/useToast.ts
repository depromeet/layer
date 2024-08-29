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
      setToastDataState((prev) => [...prev, { ...toast, id: getRandomID() }]);
    },
    [setToastDataState],
  );

  const toast = {
    success: (content: string) => emitToast({ type: "success", content }),
    error: (content: string) => emitToast({ type: "error", content }),
  };

  return { toast, toastDataState, emitToast, removeToast };
};
