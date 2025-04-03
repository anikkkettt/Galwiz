import CardItemNB from "../Cards/CardItemNB";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CardItemUnveryfiedNB from "./CardItemUnveryfiedNB";

const evenColor = "#7D7D7D";
const contributionsColorHeading = "#FFE34F";
const contributionsColorPara = "white";
const contributionsColorLink = "#C5C5C5";

const limit = 6;
const UnveryfiedToolNotebook = () => {


  const [toolNotebookData, setToolNotebookData] = useState([]);
  const [totalToolNoteBook, setTotalToolNoteBook] = useState(0);
  const [pageNo , setPageNo] = useState(0);

  const getTNBData = async (page) => {
    try {
      const res = await axios.get(`/api/v1/admin/unaproved/unapproveToolNotebook/${limit}/${page}`);
     console.log(res)
    setTotalToolNoteBook(res.data.totalUserToolNoteBook);
    setToolNotebookData(res.data.toolNotebook);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getTNBData(1);
  }, []);

  return (
    <div
    className=" d-flex flex-column justify-content-center  p-4"
    style={{
      backgroundColor: "rgb(238,238,238",
      minHeight: "500px",
      flexGrow: 1,
      alignItems: "center",
    }}
  >
    <div
      className="d-flex my-4 justify-content-evenly container"
      style={{
        width: "inherit",
        maxHeight: "fit-content",
        blockSize: "fit-content",
        flexGrow: "1",
        flexWrap: "wrap",
        gap: "50px",
      }}
    >
      {toolNotebookData.map((nb) => ( 
        <CardItemUnveryfiedNB
          heading={nb.title}
          para={nb.description}
          id={nb._id}
          pageNo={pageNo}
          backgroundColor={evenColor}
          colorHead={contributionsColorHeading}
          colorPara={contributionsColorPara}
          colorLink={contributionsColorLink}
          getTNBData={getTNBData}
        />
      ))}
    </div>

    <div className="row  mt-4 ">
      <div className="col d-flex justify-content-center">
        <Pagination
          count={Math.trunc(totalToolNoteBook / limit) + 1}
          onChange={(e, page) => {
            console.log(page);
            setPageNo(page);
          }}
        />
      </div>
    </div>
  </div>
  );
};

export default UnveryfiedToolNotebook;
