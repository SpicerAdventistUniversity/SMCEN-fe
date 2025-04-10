import AssignGrade from "./AssignGrade";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const UserList = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>
        Edit
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignGrade user={user} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserList;
