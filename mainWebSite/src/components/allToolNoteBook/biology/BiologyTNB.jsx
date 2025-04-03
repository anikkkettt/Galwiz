import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const BiologyTNB = () => {
  const [totalNoteBook, setTotalNoteBook] = useState(0);
  const [biologyData, setBiologyData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/Biology/toolNotebook/${limit}/${page}`
    );
    setTotalNoteBook(res.data.totalUserToolNoteBook);
    setBiologyData(res.data.toolnotebook);
  };
  const paginationData = (e, pageNo) => {
    getData(pageNo);
  };

  useEffect(() => {
    getData(1);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="m-5">
      <h3 className="my-5">Biology</h3>
      <div>
        <div className=" row ">
          {biologyData.map((biologyData) => (
            <div className="col-md-6 col-12">
              <p key={biologyData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(biologyData._id)}
                >
                  {biologyData.title}
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="row  ">
        <div className="col d-flex justify-content-end">
          <Pagination
            count={Math.trunc(totalNoteBook / limit) + 1}
            onChange={paginationData}
          />
        </div>
      </div>
    </div>
  );
};

export default BiologyTNB;
