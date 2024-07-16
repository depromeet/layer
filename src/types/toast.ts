import { toastMap } from "@/style/common/toast";

export type ToastMessageType = keyof typeof toastMap;

export type ToastType = {
  type: ToastMessageType;
  id: string;
  content: string;
  duration?: number;
  bottom?: number;
};
