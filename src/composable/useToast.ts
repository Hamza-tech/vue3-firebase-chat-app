import Toast from "@/components/Toast.vue";
import { h, render } from "vue";

export const useToast = () => {
  const addToast = (message: string, type: string = "info", duration: number = 3000) => {
    const toastContainer = document.createElement("div");
    document.body.appendChild(toastContainer);

    const removeToast = () => {
      render(null, toastContainer);
      document.body.removeChild(toastContainer);
    };

    const vnode = h(Toast, {
      message,
      type,
      duration,
      onClose: removeToast,
    });

    render(vnode, toastContainer);


    setTimeout(removeToast, duration + 500);
  };

  return {
    addToast,
  };
};
