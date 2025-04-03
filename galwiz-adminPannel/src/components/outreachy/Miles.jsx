import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import DeleteIcon from "@mui/icons-material/Delete";

const Miles = (props) => {
  const [singleMileData, setSingleMileData] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/main/mile/${props.mile._id}`);
      setSingleMileData(res.data.mile);
      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteMileData = async () => {
    try {
      const res = await axios.post(
        `/api/v1/main/outreachy/remove/inter${props.index}/mile/${props.mile._id}`
      );
      console.log(res);
      props.getData();
    } catch (error) {}
  };
  // console.log()
  return (
    <>
      {singleMileData ? (
        <>
          <div
            className="col-md-12 w-100 px-md-5 px-5 py-3 "
            style={{ backgroundColor: "#FFE34F", position: "relative" }}
          >
            <h1>
              Mile {props.number + 1}
              <div
                onClick={deleteMileData}
                style={{ position: "absolute", right: "50px", top: 0 }}
              >
                <DeleteIcon fontSize="large" />
              </div>
            </h1>
          </div>

          <div className="row m-md-5 m-3 mb-5">
            <div class="container">
              <div class="col-sm">
                {singleMileData ? parse(singleMileData.htmlData) : ""}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Miles;
