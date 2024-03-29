import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from "../services/UserService"
import { toast } from 'react-toastify';

function ModalAddUser(props) {
    const {show, handleClose, handleUpdate} = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    
    const handleSaveUser = async () => {
      let res = await postCreateUser(name, job)
      if(res && res.id) {
        handleClose()
        setName('')
        setJob('')
        handleUpdate({first_name: res.name, id: res.id})
        toast.success("Saved User Successfully!!")
      } else {
        toast.success("Erorr!!")
      }
    }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>ADD NEW USER</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddUser;