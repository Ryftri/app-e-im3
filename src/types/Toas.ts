export type ToastType = "success" | "error" | "warning";

export interface ToastNotificationProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}