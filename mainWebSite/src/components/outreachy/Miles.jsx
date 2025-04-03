import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

const Miles = (props) => {
  const [singleMileData, setSingleMileData] = useState("");
  const getData = async () => {
    try {
      const res = await axios(`/api/v1/main/mile/${props.mile._id}`);
      setSingleMileData(res.data.mile);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log()
  return (
    <>
      <div
        className="col-md-12 w-100 px-md-5 px-5 py-3 "
        style={{ backgroundColor: "#FFE34F" }}
      >
        <h1>Mile {props.number + 1}</h1>
      </div>

      <div className="row m-md-5 m-3 mb-5">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              {singleMileData ? parse(singleMileData.htmlData) : ""}
            </div>
            <div class="col-sm">{/* <img src={val.pic} /> */}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Miles;
