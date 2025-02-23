import { ref, reactive } from "vue";

interface ModalOptions {
  message: string;
  header?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  accept?: () => void;
  reject?: () => void;
}

const isOpen = ref(false);

const modalData = reactive<ModalOptions>({
  message: "",
  header: "",
  acceptLabel: "Confirm",
  rejectLabel: "Cancel",
  accept: undefined,
  reject: undefined,
});

const show = (options: ModalOptions) => {
  modalData.message = options.message;
  modalData.header = options.header || "Confirmation";
  modalData.acceptLabel = options.acceptLabel || "Confirm";
  modalData.rejectLabel = options.rejectLabel || "Cancel";
  modalData.accept = options.accept || closeModal;
  modalData.reject = options.reject || closeModal;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const acceptAction = () => {
  modalData.accept && modalData.accept();
  closeModal();
};

const rejectAction = () => {
  modalData.reject && modalData.reject();
  closeModal();
};

export const useConfirmModal = () => {
  return { isOpen, modalData, show, closeModal, acceptAction, rejectAction };
};
