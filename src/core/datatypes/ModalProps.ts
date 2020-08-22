export interface ModalProps {
  modalShow: boolean;
  title: string;
  content: any;
  detailsActionText?: string;
  confirmButtonText: string;
  closeButtonText?: string;
  detailsAction?: any;
  confirmAction: any;
  closeAction?: any;
  confirmButtonVariant?: any;
  displayConfirm?: boolean;
  reset: any;
}

export const EmptyModalProps: ModalProps = {
  confirmAction: undefined,
  confirmButtonText: '',
  content: undefined,
  modalShow: false,
  title: '',
  reset: undefined
};
