import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const ExperimentalDesignAndStudiesNB = () => {
  const [totalNoteBook, setTotalNoteBook] = useState(0);
  const [
    experimentalDesignAndStudiesData,
    setExperimentalDesignAndStudiesData,
  ] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/ExperimentalDesignAndStudies/notebook/${limit}/${page}`
    );
    setTotalNoteBook(res.data.totalUserNoteBook);
    setExperimentalDesignAndStudiesData(res.data.notebook);
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
      <h3 className="my-5">Experimental Design And Studies</h3>
      <div>
        <div className=" row ">
          {experimentalDesignAndStudiesData.map(
            (experimentalDesignAndStudiesData) => (
              <div className="col-md-6 col-12">
                <p key={experimentalDesignAndStudiesData._id}>
                  <div
                    className="pointer"
                    onClick={(e) =>
                      navigate(experimentalDesignAndStudiesData._id)
                    }
                  >
                    {experimentalDesignAndStudiesData.title}
                  </div>
                </p>
              </div>
            )
          )}
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

export default ExperimentalDesignAndStudiesNB;
