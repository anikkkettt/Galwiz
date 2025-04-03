

import React from "react";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import {url} from "./../baseURL";

const Card = (props) => {
  const bg = props.index % 2 === 0 ? "#7D7D7D" : "#586284";
  // let data = "";
  // for (let i = 0; i < parse(props.para).props.children.split(" ").length; i++) {
  //   const element = parse(props.para).props.children.split(" ")[i];
  //   data = `${data} ${element}`;
  // }
  // console.log(data);
  return (
    <>
      {" "}
      <div
        className="card text-center "
        style={{
          position: "relative",
          width: "18rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          backgroundColor: bg,
          color: "white",
          minHeight: "500px",
          maxHeight: "500px",
        }}
      >
        <img
          src={`/api/v1/main/image/${props.data.photo}`}
          className="card-img-top"
          alt="..."
        />

        {/* <div className="col-md-3 m-3 text-center card-item p-2" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', backgroundColor:props.backgroundColor}}> */}
        <h5 style={{ color: props.colorHead }}>{props.heading}</h5>
        <h5>{props.data.title}</h5>
        <span
          style={{
            // color: props.colorPara,
            marginBottom: "35px",
            maxHeight: "300px",
            overflow: "hidden",
          }}
        >
          {parse(props.data.description)}
        </span>
        <div
          // to={`use_case/${props.data._id}`}
          onClick={() => window.open(`${url}/use_case/${props.data._id}`)}
          className="mb-2"
          style={{
            position: "absolute",
            bottom: "2px",
            marginRight: "auto",

            marginLeft: "auto",
            right: "0",
            left: "0",
            color: "white",
            textDecoration: "none",
          }}
        >
          <span>Visit Use Case</span>
          <i
            className="bi bi-chevron-double-right "
            style={{ marginLeft: "10px" }}
          ></i>{" "}
        </div>
      </div>
    </>
  );
};

export default Card;
