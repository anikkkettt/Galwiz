import React, { useState, useContext } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../useContext/UserContext";

const LoginForm = (props) => {
  const { updateAdminData, adminData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const emailHandler = (event) => {
    props.setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/v1/admin", {
        email: props.email,
        password,
      });
      props.setOpenSnackbar(true);
      props.setMessage(res.data.message);
      updateAdminData(res.data.data.user);
      props.setSeverity("success");
      navigate("/");
      props.setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      props.setEmail("");
      setPassword("");
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
            <span className="h1 fw-bold mb-0">
              <img src="/images/logo.png" alt="Logo" />
            </span>
          </div>

          <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
            Sign into your account
          </h5>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example17">
              Email address
            </label>
            <input
              type="email"
              id="form2Example17"
              className="form-control form-control-lg"
              onChange={emailHandler}
              value={props.email}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example27">
              Password
            </label>
            <input
              type="password"
              id="form2Example27"
              className="form-control form-control-lg"
              onChange={passwordHandler}
              value={password}
            />
          </div>

          <div className="pt-1 mb-4">
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
