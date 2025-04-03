import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown, Navbar, Nav, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import SnackbarComponent from "../reUsableComponent/SnackbarComponent";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Modal from "react-bootstrap/Modal";

import Login from "../login/Login";
import SignUp from "../signUp/SignUp";
import AskForSignUp from "../signUp/AskForSignUp";
import AskForLogin from "../login/AskForLogin";
import CloseIcon from "@mui/icons-material/Close";

import "./header.css";
import DropdownSubtopics from "./DropdownSubtopics";
import LoginModalContext from "../../store/openLoginModal-context";
import userDataContext from "../../store/userData-context";
import MyProfile from "../Modals/Profile";
import ChangePassword from "../Modals/ChangePassword";
import UseCaseSearchList from "./UseCaseSearchList";

const Header = ({ data }) => {
  const LoginModalCtx = useContext(LoginModalContext);
  const userDataCtx = useContext(userDataContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [show, setShow] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [loginForms, setLoginForm] = useState(true);
  const [signForms, setSignForm] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [showChangePassword, setShowChangePassword] = useState(false);

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const showLogin = (e) => {
    setShowLoginMenu(!showLoginMenu);
  };
  const hideLogin = (e) => {
    setShowLoginMenu(false);
  };
  const navigate = useNavigate();

  const searchHandler = async (event) => {
    event.target.value.length === 0
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    try {
      const result = await axios.get(
        `/api/v1/user/search/useCase/${event.target.value}`
      );
      setShowSearchResult(true);
      setSearchResult(result.data.useCase);
    } catch (error) {
      setSearchResult([]);
    }
  };

  const logoutHandler = () => {
    axios
      .get("/api/v1/user/logout")
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <MyProfile
        showMyProfile={showMyProfile}
        setShowMyProfile={setShowMyProfile}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
      />
      <ChangePassword
        showChangePassword={showChangePassword}
        setShowChangePassword={setShowChangePassword}
      />
      <header id="head">
        <SnackbarComponent
          message={message}
          severity={severity}
          open={openSnackbar}
          setOpen={setOpenSnackbar}
        />
        <Navbar
          collapseOnSelect
          className="m-0 p-0 sm-background "
          expand="lg"
          variant="dark"
          style={{ fontSize: "20px" }}
        >
          <Navbar.Brand className="mx-2 d-flex logo">
            <Link
              style={{ textDecoration: "none" }}
              className="color-header"
              to="/"
            >
              Galwiz
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className=" w-100 d-lg-flex justify-content-around px-2 gap-2 d-none color-header"
              style={{ alignItems: "center" }}
            >
              <NavDropdown
                title={
                  <div
                    className="m-0 p-0 d-flex align-items-center"
                    style={{ color: "black" }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold" }} className="p-0 m-0">
                        Use Case
                      </div>
                      <span>by topic</span>
                    </div>
                    {show ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  </div>
                }
                show={show}
                onClick={showDropdown}
                onMouseLeave={hideDropdown}
                drop="down"
                id="basic-nav-dropdown"
                className="border p-1"
                style={{
                  background: "rgb(255,250,123)",
                  borderRadius: "10px",
                  minWidth: "100px",
                  minHeight: "inherit",
                }}
              >
                {data.map((subject) => {
                  return <DropdownSubtopics subject={subject} />;
                })}
              </NavDropdown>
              <div
                className="d-flex flex-column m-1 my-0"
                style={{ flexGrow: 1 }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <Form
                    className=""
                    style={{ width: "40%", position: "relative" }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Search Use Case"
                      onChange={searchHandler}
                      className="mr-sm-2"
                      style={{ borderRadius: "20px", fontSize: "inherit" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: 5,
                        cursor: "pointer",
                        zIndex: 5,
                      }}
                    >
                      {showSearchResult ? (
                        <CloseIcon
                          style={{ color: "black" }}
                          onClick={(e) => setShowSearchResult(false)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Form>
                  <Nav>
                    <div
                      className="color-header pointer"
                      onClick={() =>
                        window.open("https://galaxyproject.org", "_blank")
                      }
                    >
                      About
                    </div>
                  </Nav>
                  {userDataCtx.userData.auth ? (
                    <NavDropdown
                      title={
                        <div className="d-flex justify-content-center align-items-center">
                          <span style={{ color: "white" }}>
                            {" "}
                            {userDataCtx.userData.firstName}
                          </span>
                          {showLoginMenu ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </div>
                      }
                      show={showLoginMenu}
                      onClick={showLogin}
                      onMouseLeave={hideLogin}
                      drop="down"
                      id="basic-nav-dropdown"
                      className="p-0 m-0"
                      style={{
                        // background: "rgb(255,250,123)",
                        borderRadius: "10px",
                        minWidth: "100px",
                        minHeight: "inherit",
                      }}
                    >
                      <Nav>
                        <span
                          className="logout w-100 p-2 d-flex justify-content-center align-items-center"
                          onClick={(e) => setShowMyProfile(true)}
                        >
                          My profile
                        </span>
                      </Nav>
                      <Nav>
                        <span
                          className="logout w-100 p-2 d-flex justify-content-center align-items-center"
                          onClick={(e) => setShowChangePassword(true)}
                        >
                          Change Password
                        </span>
                      </Nav>
                      <Nav className="p-0 m-0">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          className="color-header p-0 m-0 d-flex justify-content-center align-items-center w-100 logout p-2"
                          onClick={() => {
                            userDataCtx.authFalse();
                            logoutHandler();
                          }}
                          to=""
                        >
                          LogOut
                        </Link>
                      </Nav>
                    </NavDropdown>
                  ) : (
                    <Nav>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="color-header"
                        onClick={() => LoginModalCtx.openLoginModal()}
                        to=""
                      >
                        Login/Register
                      </Link>
                    </Nav>
                  )}

                  <Nav>
                    {userDataCtx.userData.auth ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        className="color-header"
                        to="/contribute"
                      >
                        Contribute
                      </Link>
                    ) : (
                      <Link
                        style={{ textDecoration: "none" }}
                        className="color-header"
                        onClick={() => LoginModalCtx.openLoginModal()}
                        to=""
                      >
                        Contribute
                      </Link>
                    )}
                  </Nav>
                  <Nav className="p-0" id="mySlider">
                    <img
                      src="/images/logo_1.png"
                      alt=""
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "125px",
                      }}
                      onClick={() =>
                        window.open("https://galaxyproject.org", "_blank")
                      }
                    />
                  </Nav>
                  <Nav className="p-0" id="mySlider">
                    <img
                      src="/images/logoo_2.png"
                      alt=""
                      style={{
                        margin: "0",
                        padding: "0",
                        width: "125px",
                      }}
                      onClick={() =>
                        window.open(
                          "https://www.outreachy.org/docs/applicant/",
                          "_blank"
                        )
                      }
                    />
                  </Nav>
                </div>
                <div className="d-flex gap-4 " style={{}}>
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: "17px",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      className="color-header"
                      to="/workflows"
                    >
                      All workflows
                    </Link>
                  </span>
                  <span style={{ textAlign: "center", fontSize: "17px" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="color-header"
                      to="/use_case"
                    >
                      All use cases
                    </Link>
                  </span>
                  <span style={{ textAlign: "center", fontSize: "17px" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="color-header"
                      to="/notebook"
                    >
                      All Notebooks
                    </Link>
                  </span>
                  <span style={{ textAlign: "center", fontSize: "17px" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="color-header"
                      to="/tool_noteBook"
                    >
                      All Tool Notebooks
                    </Link>
                  </span>
                  <span style={{ textAlign: "center", fontSize: "17px" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      className="color-header"
                      to="/outreachy"
                    >
                      Outreachy 2022
                    </Link>
                  </span>
                </div>
              </div>
            </Nav>

            {/* small screen */}

            <div className="d-lg-none p-0 m-0 color-header" style={{}}>
              <ul className="w-100 p-0 m-0" style={{ listStyle: "none" }}>
                {/* <li className="d-flex align-items-center w-100 ">
                  <h2 className="text-center w-100">Topics</h2>
                </li>
                {data.map((subject) => {
                  return (
                    <li>
                      <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="me-auto">
                          <NavDropdown
                            className="color-header ps-4 pt-1"
                            style={{
                              color: "black",
                              borderBottom: "0.1px solid black",
                            }}
                            title={
                              <p className="color-header d-flex justify-content-between align-items-center p-0 m-0  ">
                                <span> {subject.topic}</span>{" "}
                                <i
                                  className="bi bi-arrow-down-short "
                                  style={{ fontSize: "40px", color: "black" }}
                                ></i>
                              </p>
                            }
                            id="basic-nav-dropdown"
                          >
                            {subject.subtopic.map((item) => {
                              return (
                                <>
                                  <NavDropdown.Item
                                    href="#action/3.4"
                                    style={{ color: "black" }}
                                  >
                                    {item}
                                  </NavDropdown.Item>
                                  <NavDropdown.Divider />
                                </>
                              );
                            })}
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </li>
                  );
                })} */}

                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/workflows")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    All Workflows
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/use_case")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    All Use Case
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/notebook")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    All Notebooks
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/tool_noteBook")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    All Tool Notebooks
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>

                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/outreachy")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    Outreachy 2022
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <NavDropdown.Item
                    onClick={() =>
                      window.open("https://galaxyproject.org", "_blank")
                    }
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{ borderBottom: "0.1px solid black" }}
                  >
                    About
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
                <li>
                  {userDataCtx.userData.auth ? (
                    <NavDropdown
                      title={
                        <div
                          className="d-flex justify-content-center color-header p-2 pt-1"
                          style={{
                            borderBottom: "0.1px solid black",
                            borderStyle: "groove",
                          }}
                        >
                          <span> {userDataCtx.userData.firstName}</span>
                          {showLoginMenu ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </div>
                      }
                      show={showLoginMenu}
                      onClick={showLogin}
                      onMouseLeave={hideLogin}
                      drop="down"
                      id="basic-nav-dropdown"
                      className="p-0 m-0 "
                      // style={{
                      //   // background: "rgb(255,250,123)",
                      //   borderRadius: "10px",
                      //   minWidth: "100px",
                      //   minHeight: "inherit",
                      // }}
                    >
                      <Nav>
                        <span
                          className="logout w-100 p-2 d-flex justify-content-center align-items-center"
                          onClick={(e) => setShowMyProfile(true)}
                        >
                          My profile
                        </span>
                      </Nav>
                      <Nav>
                        <span
                          className="logout w-100 p-2 d-flex justify-content-center align-items-center"
                          onClick={(e) => setShowChangePassword(true)}
                        >
                          Change Password
                        </span>
                      </Nav>
                      <Nav className="p-0 m-0">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          className="color-header p-0 m-0 d-flex justify-content-center align-items-center w-100 logout p-2"
                          onClick={() => {
                            userDataCtx.authFalse();
                            logoutHandler();
                          }}
                          to=""
                        >
                          LogOut
                        </Link>
                      </Nav>
                    </NavDropdown>
                  ) : (
                    <>
                      <NavDropdown.Item
                        className="d-flex justify-content-center color-header p-2 pt-1"
                        style={{
                          borderBottom: "0.1px solid black",
                          borderStyle: "groove",
                        }}
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          className="color-header"
                          onClick={() => LoginModalCtx.openLoginModal()}
                          to=""
                        >
                          Login/Register
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                </li>
                <li>
                  <NavDropdown.Item
                    onClick={(e) => navigate("/contribute")}
                    className="d-flex justify-content-center color-header p-2 pt-1"
                    style={{
                      borderBottom: "0.1px solid black",
                      borderStyle: "groove",
                    }}
                  >
                    Contribute
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </li>
              </ul>
            </div>
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
        {showSearchResult ? (
          <UseCaseSearchList
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            setShowSearchResult={setShowSearchResult}
          />
        ) : (
          ""
        )}
        <Modal
          className="modal-90w border"
          show={LoginModalCtx.loginModalOpen}
          style={{ width: "100%" }}
          size="xl"
          onHide={() => {
            LoginModalCtx.closeLoginModal();
            setSignForm(false);
            setLoginForm(true);
          }}
          aria-labelledby="example-custom-modal-styling-title"
        >
          <div
            className="row  d-flex justify-content-center"
            style={{ position: "absolute", top: "10px", right: "-5px" }}
          >
            <div className="col-md-6  d-flex justify-content-end pointer">
              <CloseIcon
                onClick={() => {
                  LoginModalCtx.closeLoginModal();
                }}
              />
            </div>
          </div>

          <div
            className="row d-flex justify-content-around align-items-center linear"
            style={
              loginForms
                ? {
                    backgroundImage:
                      "linear-gradient(80deg, #d9d9d9 50%, #ffe34f 50%)",
                    minHeight: "80vh",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(-80deg, #d9d9d9 50%, #ffe34f 50%)",
                    minHeight: "80vh",
                  }
            }
          >
            {loginForms ? (
              <Login
                setOpenSnackbar={setOpenSnackbar}
                setMessage={setMessage}
                setSeverity={setSeverity}
              />
            ) : (
              <AskForLogin
                setSignForm={setSignForm}
                setLoginForm={setLoginForm}
              />
            )}

            {signForms ? (
              <SignUp
                setOpenSnackbar={setOpenSnackbar}
                setMessage={setMessage}
                setSeverity={setSeverity}
              />
            ) : (
              <AskForSignUp
                setSignForm={setSignForm}
                setLoginForm={setLoginForm}
              />
            )}
          </div>
        </Modal>
      </header>
    </>
  );
};

export default Header;
