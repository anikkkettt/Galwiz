import React, { useRef } from "react";
import { Button, Form, Modal, CloseButton } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Feedback = ({ showFeedback, setShowFeedback }) => {
  const message = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const handleClose = () => {
    setShowFeedback(false);
  };
  const sendDataHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/main/feedback", {
        email: email.current.value,
        name: name.current.value,
        message: message.current.value,
      });
      setShowFeedback(false);
    } catch (error) {}
  };

  return (
    <Modal
      show={showFeedback}
      onHide={handleClose}
      style={{ position: "fixed" }}
    >
      <div className="row">
        <div className="col-10">
          <Modal.Header>
            <Modal.Title className="text-center">
              You can find answers on our Gitter Channel. Have another Question?
            </Modal.Title>
          </Modal.Header>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <CloseIcon fontSize="large" onClick={handleClose} />
        </div>
      </div>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPlaintext">
            <textarea
              type="text"
              style={{ height: 200, width: "100%" }}
              placeholder="Message"
              ref={message}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintext">
            <textarea
              type="text"
              style={{ width: "100%" }}
              placeholder="Your Name"
              ref={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintext">
            <textarea
              type="text"
              style={{ width: "100%" }}
              placeholder="Email Address"
              ref={email}
            />
          </Form.Group>

          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="secondary"
              onClick={sendDataHandle}
              type="submit"
              style={{ backgroundColor: "#12182D", color: "white" }}
            >
              Send Message
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Feedback;
