import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const Subscribe = ({ showSubscribe, setShowSubscribe }) => {
  const handleClose = () => {
    setShowSubscribe(false);
  };
  const sendDataHandler = async () => {
    try {
      const res = await axios.post("/api/v1/main/subscribe", {
        email: email.current.value,
        frequency: frequency.current.value,
        userPanel: userPanel.current.value,
      });
      setShowSubscribe(false);
    } catch (error) {}
  };
  const email = useRef(null);
  const frequency = useRef(null);
  const userPanel = useRef(null);

  return (
    <Modal
      show={showSubscribe}
      onHide={handleClose}
      style={{ position: "fixed" }}
    >
      <div className="row">
        <div className="col-10">
          <Modal.Header>
            <div>
              <h1>Our World in Data</h1>
              <h4>Newsletter</h4>
              <div style={{ fontSize: "13px" }}>
                By subscribing you are agreeing to the terms of our privacy
                policy.
              </div>
            </div>
          </Modal.Header>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <CloseIcon fontSize="large" onClick={handleClose} />
        </div>
      </div>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={email} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Frequency</Form.Label>
            <Form.Check
              ref={frequency}
              type="radio"
              label="Immediate"
              value="Immediate"
              name="frequency"
            />
            <Form.Check
              ref={frequency}
              type="radio"
              label="Biweekly"
              value="Biweekly"
              name="frequency"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User panel</Form.Label>
            <Form.Check
              ref={userPanel}
              type="radio"
              value="Receive invitations to participate in user research"
              label="Receive invitations to participate in user research"
              name="userPanel"
            />
            <Form.Check
              ref={userPanel}
              type="radio"
              value="Get early access to new things we build"
              label="Get early access to new things we build"
              name="userPanel"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          variant="secondary"
          onClick={sendDataHandler}
          type="submit"
          style={{ backgroundColor: "#12182D", color: "white" }}
        >
          Subscribe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Subscribe;
