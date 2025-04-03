import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

const Contribute = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect((e) => {
    navigate("/contribute/use_case");
  }, []);
  return (
    <div>
      <h2 className="d-flex justify-content-center py-2">
        Choose what to upload
      </h2>
      <div
        className="row p-1 "
        style={{  backgroundColor: " rgb(255, 250, 123)", }}
      >
        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/contribute/use_case`}
        >
          <h3 className="p-1 color-black" style={{}}>Use Case</h3>
        </NavLink>

        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/contribute/tool_notebook`}
        >
          <h3 className="p-1 color-black" style={{}}>Tool Notebook</h3>
        </NavLink>
        <NavLink
          className="col-12 col-md-4 d-flex justify-content-center rounded cursor-pointer dom-link "
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#2C3143" : "",
              color: isActive ? "white" : "black",
            };
          }}
          to={`/contribute/notebook`}
        >
          <h3 className="p-1 color-black" style={{}}>Notebook</h3>
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Contribute;
