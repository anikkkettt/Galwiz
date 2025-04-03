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


const UnveryfiedNotebook = () => {

  const [notebookData, setNotebookData] = useState([]);
  const [totalNoteBook, setTotalNoteBook] = useState(0);
  const [pageNo, setPageNo] = useState(0)

  const getNBData = async (page) => {
    const res = await axios.get(`/api/v1/admin/unaproved/notebook/${limit}/${page}`);
    console.log(res)
    setTotalNoteBook(res.data.totalUnapprovedNotebook);

    setNotebookData(res.data.notebook);
  };
  useEffect(() => {
    getNBData(1);
  }, []);

  const verifyNotebook = (id) => {

  }


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
        {notebookData.map((nb) => (
          <CardItemUnveryfiedNB
            heading={nb.title}
            para={nb.description}
            id={nb._id}
            pageNo={pageNo}
            verifyNotebook={verifyNotebook}
            getNBData={getNBData}
            backgroundColor={evenColor}
            colorHead={contributionsColorHeading}
            colorPara={contributionsColorPara}
            colorLink={contributionsColorLink}
          />
        ))}
      </div>

      <div className="row  mt-4 ">
        <div className="col d-flex justify-content-center">
          <Pagination
            count={Math.trunc(totalNoteBook / limit) + 1}
            onChange={(e, page) => {
              console.log(page);
              getNBData(page);
              setPageNo(page)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UnveryfiedNotebook
