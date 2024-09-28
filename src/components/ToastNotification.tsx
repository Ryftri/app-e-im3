"use client";

import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { useState } from "react";
import { ToastNotificationProps } from "@/types/Toas";

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <HiCheck className="h-5 w-5" />;
      case "error":
        return <HiX className="h-5 w-5" />;
      case "warning":
        return <HiExclamation className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
      case "error":
        return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
      case "warning":
        return "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200";
      default:
        return "";
    }
  };

  return (
    <Toast>
      <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getBgColor()}`}>
        {getIcon()}
      </div>
      <div className="ml-3 text-sm font-normal">{`${message}`}</div>
      <Toast.Toggle onClick={onClose} />
    </Toast>
  );
};

export default ToastNotification;
