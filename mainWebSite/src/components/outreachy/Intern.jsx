import React from "react";

import Miles from "./Miles";

const Intern = (props) => {
  return (
    <div className="container">
      <div className="col-md-12 w-100">
        <div className="row d-flex row justify-content-center py-5 px-3 w-100 px-md-0">
          <div className="col-md-4 d-flex justify-content-center  align-items-center mb-md-0 mb-4  ">
            <img
              src={`/api/v1/user/image/${
                props.qutreachyData[`inter${props.index + 1}`].photo
              }`}
              alt="Profile Pic"
              className="img-fluid "
              style={{ minWidth: "190px", height: "190px" }}
            />
          </div>

          <div className="col-md-8 row-4 d-flex flex-column justify-content-center">
            <h3>
              Name : {props.qutreachyData[`inter${props.index + 1}`].name}
            </h3>
            <h3>
              Organization :{" "}
              {props.qutreachyData[`inter${props.index + 1}`].organization}
            </h3>
            <h3>
              Project : {props.qutreachyData[`inter${props.index + 1}`].project}
            </h3>
          </div>
        </div>
      </div>
      {props.qutreachyData[`inter${props.index + 1}`].mile.map((val, idx) => (
        <Miles mile={val} number={idx} />
      ))}
      <div style={{ minHeight: "100vh" }}>
        <div
          className="col-md-12 w-100 px-md-5 px-5 py-2 "
          style={{ backgroundColor: "#FFE34F" }}
        >
          <h2>Conclusion</h2>
        </div>
        <div className="row m-md-5 m-3 border-bottom">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                {props.qutreachyData[`inter${props.index + 1}`].conclusion}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intern;
