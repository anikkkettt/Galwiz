import React, { useState } from "react";
import Feedback from "../feedback/Feedback";
import Subscribe from "../subscribe/Subscribe";
import { useNavigate, NavLink } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <>
      <Subscribe
        showSubscribe={showSubscribe}
        setShowSubscribe={setShowSubscribe}
      />
      <Feedback showFeedback={showFeedback} setShowFeedback={setShowFeedback} />
      <div className="row bg-section-1 bg-body">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4 mb-4 d-flex justify-content-center">
          <span
            onClick={(e) => setShowSubscribe(true)}
            className="p-2 m-2 d-flex align-items-center justify-content-evenly"
            style={{
              backgroundColor: "#3A3F50",
              color: "white",
              width: "33%",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <i class="bi bi-envelope-plus"></i> Subscribe
          </span>
          <p
            onClick={(e) => setShowFeedback(true)}
            className="p-2 m-2 d-flex align-items-center justify-content-evenly"
            style={{
              backgroundColor: "#3A3F50",
              color: "white",
              width: "33%",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <i class="bi bi-person-workspace "></i> Feedback
          </p>
          <p
            onClick={(e) => navigate("/contribute")}
            className="p-2 m-2 d-flex align-items-center justify-content-evenly"
            style={{
              backgroundColor: "#3A3F50",
              color: "white",
              width: "33%",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <i className="" style={{ color: "white" }}>
              {" "}
              <img
                src="/images/vector.png"
                alt=""
                style={{ color: "white" }}
              />{" "}
            </i>{" "}
            Contribute
          </p>
        </div>
      </div>

      <div
        className="row p-1 "
        style={{ backgroundColor: " rgb(255, 250, 123)", color: "black" }}
      >
        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/use_case`}
          onClick={scrollToTop}
        >
          <h2>Use Case</h2>
        </NavLink>

        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/tool_notebook`}
          onClick={scrollToTop}
        >
          <h2>Tool Notebook</h2>
        </NavLink>
        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/notebook`}
          onClick={scrollToTop}
        >
          <h2>Notebook</h2>
        </NavLink>
      </div>

      <section>
        <div
          className="row "
          style={{ backgroundColor: "#2C3143", color: "white" }}
        >
          <div className="col m-4 ms-5 ">SITE LINKS</div>
        </div>
        <div
          className="row text-left"
          style={{ backgroundColor: "#2C3143", color: "white" }}
        >
          <div className="col-md-3  ">
            <div className="col pointer md-footer-alignment sm-footer-alignment ">
              <p
                onClick={() =>
                  window.open("https://galaxyproject.org", "_blank")
                }
              >
                About
              </p>
              <p className="pointer">Contact</p>
              <p className="pointer">Feedback</p>
            </div>
          </div>
          <div className="col-md-3  ">
            <div className="col md-footer-alignment sm-footer-alignment">
              <p className="pointer" onClick={(e) => navigate("/use_case")}>
                All Use Case
              </p>
              <p className="pointer" onClick={(e) => navigate("/workflows")}>
                All workflows
              </p>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="col md-footer-alignment sm-footer-alignment">
              <p className="pointer" onClick={(e) => navigate("/notebook")}>
                All Notebooks
              </p>
              <p className="pointer"> Outreachy Interns and Contributions</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="col md-footer-alignment sm-footer-alignment">
              <p className="pointer">How to use</p>
              <p
                className="pointer"
                onClick={() =>
                  window.open("https://galaxyproject.org/news/", "_blank")
                }
              >
                News
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="row d-flex justify-content-center"
          style={{ backgroundColor: "#2C3143", color: "white" }}
        >
          <div className="col-md-8 border-top">
            <div className="col d-flex justify-content-center align-items-center">
              <div className="col-md-5">
                <img
                  className="pointer"
                  src="/images/logo_1.png"
                  onClick={() =>
                    window.open("https://galaxyproject.org", "_blank")
                  }
                  width="90%"
                  alt=""
                />
              </div>
              <div className="col-md-5">
                <img
                  className="pointer"
                  src="/images/logoo_2.png"
                  onClick={() =>
                    window.open(
                      "https://www.outreachy.org/docs/applicant/",
                      "_blank"
                    )
                  }
                  width="90%"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="row p-3 d-flex justify-content-center"
          style={{ backgroundColor: "#12182D", color: "white" }}
        >
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <p>Follow Us At :</p>

            <span className="ms-3">
              {" "}
              <p>
                {" "}
                <i
                  onClick={() =>
                    window.open(
                      "https://twitter.com/galaxyproject?t=-TFzZw2Qmg2a5RbGYFXrLQ&s=08",
                      "_blank"
                    )
                  }
                  className="bi pointer bi-twitter ms-1"
                >
                  {" "}
                </i>{" "}
                <i
                  onClick={() =>
                    window.open("https://youtube.com/c/GalaxyProject", "_blank")
                  }
                  className="bi bi-youtube pointer ms-1"
                ></i>{" "}
              </p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
