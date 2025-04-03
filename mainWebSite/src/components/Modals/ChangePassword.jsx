import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import SnackbarComponent from "./../reUsableComponent/SnackbarComponent";

import CloseIcon from "@mui/icons-material/Close";
// import './Modal.css';

const ChangePassword = ({ showChangePassword, setShowChangePassword }) => {
  const handleClose = () => {
    setShowChangePassword(false);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const password = useRef(null);
  const oldPassword = useRef(null);
  const cPassword = useRef(null);

  const changePasswordHandler = async () => {
    if (password.current.value.length >= 8) {
      if (cPassword.current.value === password.current.value) {
        try {
          const res = await axios.post(`/api/v1/user/profile/update/password`, {
            password: password.current.value,
            oldPassword: oldPassword.current.value,
          });
          setShowChangePassword(false);
          setOpenSnackbar(true);
          setMessage(res.data.message);
          setSeverity("success");
        } catch (error) {
          setOpenSnackbar(true);
          setMessage(error.response.data.message);
          setSeverity("error");
        }
      } else {
        setOpenSnackbar(true);
        setMessage("Password Must be Same");
        setSeverity("error");
      }
    } else {
      setOpenSnackbar(true);
      setMessage("Password Must 8 characters ");
      setSeverity("error");
    }
  };
  return (
    <Modal
      show={showChangePassword}
      onHide={handleClose}
      sz="xl"
      style={{ position: "fixed" }}
      centered
      // dialogClassName="my-modal"
    >
      <SnackbarComponent
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <div
        style={{ backgroundColor: "#D9D9D9" }}
        className="p-3 p-md-5 d-flex flex-column justify-content-center align-items-center"
      >
        {/* <div className="row"> */}
        <div className=" d-flex justify-content-center align-items-center">
          <Modal.Header>
            <CloseIcon
              onClick={handleClose}
              sx={{ position: "absolute", right: "15px", top: "15px" }}
            />

            <div>
              <h1>Change Password</h1>
            </div>
          </Modal.Header>
        </div>
        {/* <div className="col-2 d-flex justify-content-end">
                    <CloseIcon fontSize="large" onClick={handleClose} />
                </div> */}
        {/* </div> */}
        <Modal.Body className="w-75">
          <Form className="d-flex justify-content-between align-items-center flex-column w-100">
            <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                show
                ref={oldPassword}
              />
            </Form.Group>
            <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                ref={password}
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Control
                type="password"
                ref={cPassword}
                placeholder="Re-enter password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={changePasswordHandler}
            type="submit"
            style={{ backgroundColor: "#12182D", color: "white" }}
          >
            ChangePassword
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ChangePassword;
