import * as React from 'react';
import {Modal, Button} from "react-bootstrap";
import {useState} from "react";

export interface ModalParams {
    modalOpener: any
    title: string,
    content: any,
    confirmButtonText: string,
    closeButtonText: string,
    confirmAction: any,
    closeAction?: any,
    confirmButtonVariant?: any
}

export const ConfirmationModal = (props: ModalParams) => {

    const [show, setShow] = useState(false);
    const {modalOpener, title, content, confirmButtonText, closeButtonText, confirmAction, closeAction, confirmButtonVariant} = props;

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
