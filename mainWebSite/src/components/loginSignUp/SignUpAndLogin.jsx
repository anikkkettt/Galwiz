import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { AuthAdminActions } from "../redux/admin-dash";
import { useSelector, useDispatch } from "react-redux";

import { openModal, closeModal } from "../action/index";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";

const SignUpAndLogin = () => {
  const myState = useSelector((state) => state.openClose);
  const dispatch = useDispatch();

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={myState}
        size="xl"
        onHide={() => dispatch(closeModal())}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <div
          className="row d-flex justify-content-around align-items-center "
          style={{ backgroundColor: "#D9D9D9" }}
        >
          {<Login />}

          <div className="col-md-6" style={{ display: "none" }}>
            <div
              className="row d-flex justify-content-center align-items-center flex-column p-5 "
              style={{ display: "none", backgroundColor: "#FFE34F" }}
            >
              <h3>Already Signed up?</h3>
              <p>Log in to your account by clicking the bottom here</p>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#FFE34F",
                  border: "1px solid black",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Log in
              </button>
            </div>
          </div>
          {<SignUp />}

          <div
            className="col-md-6"
            style={{ display: "", backgroundColor: "#FFE34F" }}
          >
            <div
              className="row d-flex justify-content-center align-items-center flex-column p-5 "
              style={{ backgroundColor: "#FFE34F" }}
            >
              <h3>Don’t Have an Account Yet?</h3>
              <p>
                Let’s get you all set up so you can start your first experience
              </p>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#FFE34F",
                  border: "1px solid black",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpAndLogin;
