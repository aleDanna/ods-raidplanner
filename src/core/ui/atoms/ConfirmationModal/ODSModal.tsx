import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalProps } from '@core/datatypes/ModalProps';

export const ODSModal = (props: ModalProps) => {
  const {
    modalShow,
    title,
    content,
    detailsActionText,
    confirmButtonText,
    closeButtonText,
    detailsAction,
    confirmAction,
    closeAction,
    confirmButtonVariant,
    displayConfirm,
    reset
  } = props;

  const confirmActionWrapper = () => {
    if (!!confirmAction) {
      confirmAction();
    }
    reset();
  };
  const closeActionWrapper = () => {
    if (!!closeAction) {
      closeAction();
    }
    reset();
  };

  const detailsActionWrapper = () => {
    if (!!detailsAction) {
      detailsAction();
    }
    reset();
  };

  const modalOptions = {
    show: modalShow,
    onHide: () => reset()
  };

  return (
    <>
      <Modal {...modalOptions}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          {detailsAction && (
            <Button variant={`primary`} onClick={detailsActionWrapper}>
              {detailsActionText}
            </Button>
          )}
          {closeButtonText && (
            <Button variant="secondary" onClick={closeActionWrapper}>
              {closeButtonText}
            </Button>
          )}
          { displayConfirm &&
          <Button variant={confirmButtonVariant ? confirmButtonVariant : `primary`} onClick={confirmActionWrapper}>
            {confirmButtonText}
          </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
};
