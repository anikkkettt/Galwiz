import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardItemTNB from "../Cards/CardItemTNB";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const potentialCardBG = "#DEDEDE";

const potentialHeading = "#00726C";
const potentialLink = "#A6A6A6";
const potentialPara = "black";

const limit = 6;

const ToolNoteBook = () => {
  const [toolNotebookData, settoolNotebookData] = useState([]);
  const [totalToolNoteBook, setTotalToolNoteBook] = useState(0);

  const getTNBData = async (page) => {
    const res = await axios.get(`/api/v1/admin/get/toolNotebook/${limit}/${page}`);
    console.log(res.data)
    setTotalToolNoteBook(res.data.totalToolNoteBook);
    settoolNotebookData(res.data.toolNotebook);
  };
  useEffect(() => {
    getTNBData(1);
  }, []);
  return <div
    className=" d-flex flex-column justify-content-center  p-4"
    style={{
      backgroundColor: "#FFFFFF",
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
        <CardItemTNB
          heading={nb.title}
          para={nb.description}
          id={nb._id}
          backgroundColor={potentialCardBG}
          colorHead={potentialHeading}
          colorPara={potentialPara}
          colorLink={potentialLink}
        />
      ))}
    </div>

    <div className="row  mt-4 ">
      <div className="col d-flex justify-content-center">
        <Pagination
          count={Math.trunc(totalToolNoteBook / limit) + 1}
          onChange={(e, pageNo) => {
            // console.log(pageNo);
            getTNBData(pageNo);
          }}
        />
      </div>
    </div>
  </div>
};

export default ToolNoteBook;
