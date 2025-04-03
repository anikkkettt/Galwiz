import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./signup.css";
import LoginModalContext from "../../store/openLoginModal-context";
import userDataContext from "../../store/userData-context";

const SignUp = (props) => {
  const LoginModalCtx = useContext(LoginModalContext);
  const userDataCtx = useContext(userDataContext);

  const [otps, setOtps] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const submitHandler = (event) => {
    // console.log((`${otp.first}${otp.second}${otp.third}${otp.fourth}`) * 1)
    event.preventDefault();
    // console.log(event);
    // console.log("clicked");
  };

  const submitHandlerSignUp = (event) => {
    // console.log((`${otp.first}${otp.second}${otp.third}${otp.fourth}`) * 1)
    event.preventDefault();

    signupHandler();
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

  const signupHandler = async (event) => {
    try {
      const res = await axios.post(`/api/v1/user/signup`, {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        githubUserName: githubUserName.current.value,
        userName: userName.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      });
      setOtpEmail(email.current.value);
      setSignup(false);
      setOtp(true);
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      props.setSeverity("success");
    } catch (error) {
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };

  const verfyEmailHandler = async (event) => {
    try {
      const res = await axios.patch(`/api/v1/user/signup`, {
        email: otpEmail,
        otp: `${otp.first}${otp.second}${otp.third}${otp.fourth}` * 1,
      });
      userDataCtx.userDataHandler(res.data.data.user);
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      props.setSeverity("success");
      LoginModalCtx.closeLoginModal();
    } catch (error) {
      props.setOpenSnackbar(true);
      props.setMessage(error.response.data.message);
      props.setSeverity("error");
    }
  };

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const githubUserName = useRef(null);
  const userName = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [signup, setSignup] = useState(true);
  const reSendOtpHandler = async (event) => {
    // try {
    //   const res = await axios.put(`/api/v1/user/login`, {
    //     email: emailForget.current.value,
    //   });
    //   props.setOpenSnackbar(true);
    //   props.setMessage(res.data.message);
    //   props.setSeverity("success");
    // } catch (error) {
    //   console.log(error);
    //   props.setOpenSnackbar(true);
    //   props.setMessage(error.response.data.message);
    //   props.setSeverity("error");
    // }
  };

  return (
    <>
      <div className="col-md-6 " style={{}}>
        {signup ? (
          <div
            className="row d-flex justify-content-center align-items-center flex-column p-xl-5 pt-5 pb-5 smallscreen"
            style={{ display: "none", backgroundColor: "inherit" }}
          >
            <form action="" onSubmit={submitHandlerSignUp}>
              <h4 className="text-center">
                Log in to your account by clicking the bottom here
              </h4>
              <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                  <div class="mb-3">
                    <input
                      type="text"
                      ref={firstName}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="First name "
                      required
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div class="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Last name"
                      ref={lastName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="mb-3">
                    <input
                      type="email"
                      ref={email}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="mb-3">
                    <input
                      type="text"
                      ref={githubUserName}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Github User Name  "
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="mb-3">
                    <input
                      type="text"
                      ref={userName}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="User Name  "
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="mb-3">
                    <input
                      type="password"
                      ref={password}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Password  "
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="mb-3">
                    <input
                      type="password"
                      ref={confirmPassword}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Re-enter password  "
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style={{
                      backgroundColor: "#FFE34F",
                      border: "1px solid black",
                      fontWeight: "bold",
                      color: "black",
                      width: "70%",
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : otp ? (
          <div
            className="col-md-12 d-flex justify-content-center align-items-center"
            style={{
              display: "",
              backgroundColor: "#D9D9D9",
              minHeight: "80vh",
              width: "100%",
            }}
          >
            <div
              className="row d-flex justify-content-center align-items-center flex-column"
              style={{ display: "none", backgroundColor: "", width: "100%" }}
            >
              <form
                onSubmit={submitHandler}
                className="otpAlign p-5"
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
                <div
                  className="row"
                  style={{ position: "absolute", top: "20px", left: "10px" }}
                >
                  <div className="col">
                    <ArrowBackIosNewIcon
                      onClick={() => {
                        setOtp(false);
                        setSignup(true);
                      }}
                    />
                  </div>
                </div>
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
                      className="m-2 text-center form-control rounded"
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
                    className="btn btn-light color-success btn-lg btn-block otp-btn"
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
                    onClick={verfyEmailHandler}
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default SignUp;
