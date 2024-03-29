

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from "../services/UserService"
import { toast } from 'react-toastify';

function ModelConfirm(props) {
    const {show, handleClose, dataUserDelete, handleDeleteUser} = props

    console.log(dataUserDelete)
    
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)

        if(res && +res.statusCode === 204) {
            toast.success("Deleted User Succesfully")
            handleClose()
            handleDeleteUser(dataUserDelete)
        }
    }

    return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>CONFIRM DELETEADD USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <p>Do you want to delete this user?</p>
                <span>Email: {dataUserDelete.email}</span>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  );
}

export default ModelConfirm;