import React from "react";
import { useState, useRef, useContext } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import LoginModalContext from "../../store/openLoginModal-context";
import userDataContext from "../../store/userData-context";

const Login = (props) => {
  const LoginModalCtx = useContext(LoginModalContext);
  const userDataCtx = useContext(userDataContext);

  const [resendOtpForm, setResendOtpForm] = useState(false);

  const [newPasswordEmail, setNewPasswordEmail] = useState("  ");
  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [otpEmail, setOtpEmail] = useState("");
  const verfyEmailHandler = async (event) => {
    try {
      const res = await axios.patch(`/api/v1/user/signup`, {
        email: otpEmail,
        otp: `${otp.first}${otp.second}${otp.third}${otp.fourth}` * 1,
      });

      props.setOpenSnackbar(true);
      props.setMessage(res.data.message); 
      props.setSeverity("success");
    } catch (error) {
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };

  const isOtptrue = () => {
    resendOtpForm ? verfyEmailHandler() : setLogin(false);
    setForgot(false);
    setOtps(false);
    setNewPass(true);
  };

  const loginHandler = async (event) => {
    try {
      const res = await axios.post(`/api/v1/user/login`, {
        email: email.current.value,
        password: password.current.value,
      });

      const status = res.status;
      if (status === 200) {
        userDataCtx.userDataHandler(res.data.data.user);
        props.setOpenSnackbar(true);
        props.setMessage(res.data.message);
        props.setSeverity("success");
        LoginModalCtx.closeLoginModal();
      } else {
        setLogin(false);
        setOtpEmail(email.current.value);
        setResendOtpForm(true);
        setOtps(true);
      }
    } catch (error) {
      console.log(error);
      // props.setOpenSnackbar(true);
      // props.setMessage(error.response.data.message);
      // props.setSeverity("error");
    }
  };

  const passwordHandler = async (event) => {
    try {
      const res = await axios.put(`/api/v1/user/forget/password`, {
        password: fPassword.current.value,
        passwordConfirm: fPasswordConfirm.current.value,
        email: newPasswordEmail,

        otp: `${otp.first}${otp.second}${otp.third}${otp.fourth}`,
      });
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      props.setSeverity("success");

      setLogin(true);
      setForgot(false);
      setOtps(false);

      //  const status = res.status;
      //  console.log(status);
      //  if(status==='200')
      //  {
      //   setLogin(true);
      //   setForgot(false);
      //   setOtps(false);
      //  }
      //  else
      //  {
      //   setLogin(false);
      //   setForgot(false);
      //   setOtps(true);
      //  }
    } catch (error) {
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };

  const reSendOtpHandler = async (event) => {
    try {
      const res = await axios.put(`/api/v1/user/login`, {
        email: emailForget.current.value,
      });
      setOtpEmail(emailForget.current.value);
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      props.setSeverity("success");
    } catch (error) {
      console.log(error);
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };

  const forgetHandler = async (event) => {
    try {
      setNewPasswordEmail(emailForget.current.value);

      const res = await axios.post(`/api/v1/user/forget/password`, {
        email: emailForget.current.value,
      });
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      props.setSeverity("success");
      setLogin(false);
      setForgot(false);
      setOtps(true);
    } catch (error) {
      console.log(error);
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };
  const email = useRef(null);
  const password = useRef(null);
  const emailForget = useRef(null);
  const fPassword = useRef(null);
  const fPasswordConfirm = useRef(null);
  const [login, setLogin] = useState(true);
  const [forgot, setForgot] = useState(false);
  const [otps, setOtps] = useState(false);
  const [newPass, setNewPass] = useState(false);

  const submitHandler = (event) => {
    // console.log((`${otp.first}${otp.second}${otp.third}${otp.fourth}`) * 1)
    event.preventDefault();
  };

  const inputFocus = (e) => {
    // console.log("value of is "+ e.key)
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft") {
      // Focus on the previous field
      e.target.previousSibling.focus();
    } else {
      e.target.nextSibling.focus();
    }
  };

  const otpHandler = (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };
  return (
    <>
      {login ? (
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ display: "", backgroundColor: "inherit", minHeight: "80vh" }}
        >
          <div
            className="row d-flex justify-content-center align-items-center flex-column   "
            style={{
              display: "none",
              backgroundColor: "inherit",
              width: "80%",
            }}
          >
            <div className="mb-3">
              <input
                type="email"
                ref={email}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your Email/User Name "
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                ref={password}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your password "
              />
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-around align-items-center">
                <div className="form-check ps-3 pe-3 p-3 ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Remember
                  </label>
                </div>
                <span
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#D9D9D9",
                    border: "none",

                    color: "black",
                    minWidth: "40%",
                  }}
                  onClick={() => {
                    setLogin(false);
                    setResendOtpForm(false);
                    setForgot(true);
                  }}
                >
                  <u>FORGOT PASSWORD</u>
                </span>
              </div>
            </div>

            <button
              onClick={loginHandler}
              type="button"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFE34F",
                border: "1px solid black",
                fontWeight: "bold",
                color: "black",
                width: "70%",
              }}
            >
              Log in
            </button>
          </div>
        </div>
      ) : forgot ? (
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ display: "", backgroundColor: "inherit", minHeight: "80vh" }}
        >
          <div
            className="row"
            style={{ position: "absolute", top: "20px", left: "10px" }}
          >
            <div className="col">
              <ArrowBackIosNewIcon
                onClick={() => {
                  setLogin(true);
                  setForgot(false);
                }}
              />
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center flex-column"
            style={{
              display: "none",
              backgroundColor: "inherit",
              width: "80%",
            }}
          >
            <div className="mb-3">
              <h4 className="text-center">Forgot Password</h4>
            </div>
            <div className="mb-3 p-3">
              <input
                type="email"
                ref={emailForget}
                className="form-control"
                id="exampleFormControlInputEmail"
                placeholder="Enter Your Email "
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFE34F",
                border: "1px solid black",
                fontWeight: "bold",
                color: "black",
                width: "50%",
              }}
              onClick={forgetHandler}
            >
              Submit
            </button>
          </div>
        </div>
      ) : otps ? (
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ display: "", backgroundColor: "#D9D9D9", minHeight: "80vh" }}
        >
          <div
            className="row"
            style={{ position: "absolute", top: "20px", left: "10px" }}
          >
            <div className="col">
              <ArrowBackIosNewIcon
                onClick={() => {
                  if (resendOtpForm === true) {
                    setOtp(false);
                    setLogin(true);
                  } else {
                    setOtp(false);
                    setForgot(true);
                  }
                }}
              />
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center flex-column"
            style={{ display: "none", backgroundColor: "", width: "100%" }}
          >
            <form
              onSubmit={submitHandler}
              className="otpAlign p-xl-5"
              style={{
                width: "100%",
                backgroundColor: "#D9D9D9",
                borderRadius: "20px",
                color: "black",
              }}
            >
              {/* <div className="d-flex align-items-center mb-3 pb-1">
          <i
            className="fas fa-cubes fa-2x me-3"
            style={{ color: "#ff6219" }}
          ></i>
          <img src="/images/carePlusLogo.svg" alt="Logo" />
          <span className="h1 fw-bold mb-0"></span>
        </div> */}

              <h5
                className="fw-normal  text-center mt-4"
                style={{ letterSpacing: "1px" }}
              >
                Otp has been successfully send
              </h5>
              <h5
                className="fw-normal mt-4 text-center"
                style={{ letterSpacing: "1px" }}
              >
                Your code to
              </h5>
              <div className="form-outline mb-4">
                <div
                  id="otp"
                  className="inputs d-flex flex-row justify-content-center mt-4"
                >
                  <input
                    className="m-2 text-center form-control rounded"
                    type="text"
                    id="first"
                    name="first"
                    maxLength={1}
                    onChange={otpHandler}
                    value={otp.first}
                    onKeyUp={inputFocus}
                  />
                  <input
                    className="m-2 text-center  form-control rounded"
                    type="text"
                    id="second"
                    name="second"
                    maxLength={1}
                    onChange={otpHandler}
                    value={otp.second}
                    onKeyUp={inputFocus}
                  />
                  <input
                    className="m-2 text-center form-control rounded"
                    type="text"
                    id="third"
                    name="third"
                    maxLength={1}
                    onChange={otpHandler}
                    value={otp.third}
                    onKeyUp={inputFocus}
                  />
                  <input
                    className="m-2 text-center form-control rounded"
                    type="text"
                    id="fourth"
                    name="fourth"
                    maxLength={1}
                    onChange={otpHandler}
                    value={otp.fourth}
                    onKeyUp={inputFocus}
                  />
                </div>
              </div>

              <div className="mt-4 mb-4 d-flex justify-content-around">
                <button
                  className="btn border btn-light color-success btn-lg btn-block otp-btn"
                  onClick={reSendOtpHandler}
                  type="submit"
                  style={{
                    backgroundColor: "#FFE34F",
                    border: "1px solid black",
                    fontWeight: "bold",
                    color: "black",
                    width: "40%",
                  }}
                >
                  Re-send
                </button>
                <button
                  className="btn btn-light color-success btn-lg btn-block otp-btn"
                  type="submit"
                  style={{
                    backgroundColor: "#FFE34F",
                    border: "1px solid black",
                    fontWeight: "bold",
                    color: "black",
                    width: "40%",
                  }}
                  onClick={() => {
                    isOtptrue();
                  }}
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : newPass ? (
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ display: "", backgroundColor: "#D9D9D9", minHeight: "80vh" }}
        >
          <div
            className="row"
            style={{ position: "absolute", top: "20px", left: "10px" }}
          >
            <div className="col">
              <ArrowBackIosNewIcon
                onClick={() => {
                  setNewPass(false);
                  setOtps(true);
                }}
              />
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center flex-column   "
            style={{ display: "none", backgroundColor: "", width: "80%" }}
          >
            <div className="mb-3">
              <h3>Generate Your New Password</h3>
            </div>
            <div className="mb-3">
              <input
                type="password"
                ref={fPassword}
                className="form-control"
                id="exampleFormControlInputCPass"
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                ref={fPasswordConfirm}
                className="form-control"
                id="exampleFormControlInputCpass"
                placeholder="Enter Confirm Password "
              />
            </div>

            <button
              type="button"
              onClick={passwordHandler}
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFE34F",
                border: "1px solid black",
                fontWeight: "bold",
                color: "black",
                width: "70%",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
