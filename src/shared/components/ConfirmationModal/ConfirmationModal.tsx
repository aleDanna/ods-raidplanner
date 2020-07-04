import * as React from 'react';
import {Modal, Button} from "react-bootstrap";
import {useState} from "react";

export interface ModalParams {
    modalOpener: any,
    id: any,
    title: string,
    content: any,
    detailsActionText: string
    confirmButtonText: string,
    closeButtonText: string,
    detailsAction: any,
    confirmAction: any,
    closeAction?: any,
    confirmButtonVariant?: any
}

export const ConfirmationModal = (props: ModalParams) => {

    const [show, setShow] = useState(false);
    const {modalOpener, id, title, content, detailsActionText, confirmButtonText, closeButtonText, detailsAction, confirmAction, closeAction, confirmButtonVariant} = props;

    const showModal = () => {setShow(true)};
    const hideModal = () => {setShow(false)};

    const confirmActionWrapper = () => {
        if (!!confirmAction) {
            confirmAction();
        }
        hideModal();
    }
    const closeActionWrapper = () => {
        if (!!closeAction) {
            closeAction()
        }
        hideModal();
    }

    const detailsActionWrapper = (id) => {
        if (!!detailsAction) {
            detailsAction(id)
        }
        hideModal();
    }

    const modalOptions = {
        show: show,
        onHide: hideModal
    }

    return (
        <>
            <a onClick={showModal} >
                {modalOpener}
            </a>

            <Modal {...modalOptions} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant={`primary`} onClick={() => detailsActionWrapper(id)}>
                        {detailsActionText}
                    </Button>
                    <Button variant="secondary" onClick={closeActionWrapper}>
                        {closeButtonText}
                    </Button>
                    <Button variant={confirmButtonVariant ? confirmButtonVariant : `primary`} onClick={confirmActionWrapper}>
                        {confirmButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
