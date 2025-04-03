import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../useContext/UserContext";

const OtpForm = (props) => {
  const { updateAdminData, adminData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState();

  const otpHandler = (event) => {
    setOtp(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/admin/otpLogin", {
        email: props.email,
        otp,
      });
      console.log(res.data.data.user);
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      updateAdminData(res.data.data.user);
      props.setSeverity("success");
      navigate("/");
    } catch (error) {
      console.log(error.response);
      props.setEmail("");
      setOtp("");
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };
  return (
    <div className="col-md-6 col-lg-7 d-flex align-items-center">
      <div className="card-body p-4 p-lg-5 text-black">
        <form onSubmit={submitHandler}>
          <div className="d-flex align-items-center mb-3 pb-1">
            <i
              className="fas fa-cubes fa-2x me-3"
              style={{ color: "#ff6219" }}
            ></i>
            <img src="/images/carePlusLogo.svg" alt="Logo" />
            <span className="h1 fw-bold mb-0"></span>
          </div>

          <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
            Please check your email for a message with your code. Your code is 4
            numbers long.
          </h5>
          <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
            We sent your code to{" "}
            {props.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")}
          </h5>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example27">
              Enter OTP
            </label>
            <input
              type="password"
              id="form2Example27"
              className="form-control form-control-lg"
              onChange={otpHandler}
              value={otp}
            />
          </div>

          <div className="pt-1 mb-4">
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
