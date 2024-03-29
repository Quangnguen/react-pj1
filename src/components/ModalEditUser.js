import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {putUpdateUser} from "../services/UserService"
import { toast } from 'react-toastify';

function ModalEditUser(props) {
    const {show,handleClose, dataUserEdit, handleEditUserFromModal} = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    
    
    const handleEditUser = async () => {
        let res = await putUpdateUser(name,job, dataUserEdit.id)
        if(res && res.updatedAt) {
          handleEditUserFromModal({
            first_name: name,
            id: dataUserEdit.id
          })

          handleClose()
          toast.success('Updated user Successfully')
        }
    }

    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.job)
        }
    }, [dataUserEdit])

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>EDIT USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Job</label>
                <input type="text" value={job} onChange={(e) => setJob(e.target.value)} className="form-control"/>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;