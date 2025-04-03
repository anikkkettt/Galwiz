import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const AskForLogin = (props) => {
  return (
    <>
      <div className="col-md-6" style={{ minHeight: "100%", backgroundColor: "inherit" }}>
        <div
          className="row d-flex justify-content-center align-items-center flex-column p-5 "
          style={{ width: '100%', backgroundColor: "inherit" }}
        >


          <h3 className="mt-4" >Already Signed up?</h3>
          <p>Log in to your account by clicking the bottom here </p>
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
              props.setSignForm(false);
              props.setLoginForm(true);
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default AskForLogin;
