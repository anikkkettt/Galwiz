import React from "react";

const AskForSignUp = (props) => {
  return (
    <>
      <div
        className="col-md-6"
        style={{ minHeight: "100%", backgroundColor: "inherit" }}
      >
        <div
          className="row d-flex justify-content-center align-items-center flex-column p-5 "
          style={{ backgroundColor: "inherit" }}
        >
          <h3>Don’t Have an Account Yet?</h3>
          <p>Let’s get you all set up so you can start your first experience</p>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#FFE34F",
              border: "1px solid black",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={() => {
              props.setSignForm(true);
              props.setLoginForm(false);
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default AskForSignUp;
