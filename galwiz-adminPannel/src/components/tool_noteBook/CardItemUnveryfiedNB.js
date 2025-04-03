

import React from "react";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

const CardItemUnveryfiedNB = (props) => {


  const handleVerify = async (id) => {
    try {
      const res = await axios.get(`/api/v1/admin/aprove/toolNotebook/${props.id}`);
      props.getTNBData(props.pageNo);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {" "}
      <div
        className="card text-center p-3"
        style={{
          position: "relative",
          width: "18rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          backgroundColor: props.backgroundColor,
          color: "white",
          minHeight: "250px",
          maxHeight: "250px",
        }}
      >
        {/* <div className="col-md-3 m-3 text-center card-item p-2" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', backgroundColor:props.backgroundColor}}> */}
        <h5 style={{ color: props.colorHead }}>{props.heading}  Unverify Tool Notebook  </h5>
        <span
          style={{
            color: props.colorPara,
            marginBottom: "35px",
            maxHeight: "20vh",
            overflow: "hidden",
          }}
        >
          {parse(props.para)}
        </span>
        <Link
          to={`${props.id}`}
          className="mb-2"
          style={{
            position: "absolute",
            bottom: "40px",
            marginRight: "auto",

            marginLeft: "auto",
            right: "0",
            left: "0",
            color: props.colorLink,
            textDecoration: "none",
          }}
        >
          <span>Visit Notebook</span>
          <i
            className="bi bi-chevron-double-right "
            style={{ marginLeft: "10px" }}
          ></i>{" "}
        </Link>

        <button
          type="button"
          className="btn btn-primary"
          style={{
            position: "absolute",
            bottom: "5px",
            marginRight: "auto",
            width: "50%",

            marginLeft: "auto",
            right: "0",
            left: "0",
            color: props.colorLink,
            textDecoration: "none",
          }}
          onClick={() => handleVerify(props.id)}
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default CardItemUnveryfiedNB;
