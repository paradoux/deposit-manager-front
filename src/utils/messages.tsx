import { toast } from "react-toastify";
export const DefaultMSG = (text: string) => {
  return toast(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    toastId: 1,
  });
};

export const SuccessMSG = (text: string) => {
  return toast.success(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    toastId: 2,
  });
};
export const WarningMSG = (text: string) => {
  return toast.warn(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    toastId: 3,
  });
};
export const ErrorMSG = (text: string) => {
  return toast.error(`${text}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    toastId: 4,
  });
};
