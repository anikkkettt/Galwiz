import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WorkFlowSearchList from "./WorkFlowSearchList";

const limit = 24;

const AllWorkFlow = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [totalWorkFlow, setTotalWorkFlow] = useState(0);
  const [workBookData, setWorkBookData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(`/api/v1/main/get/workFlow/${limit}/${page}`);
    setTotalWorkFlow(res.data.totalWorkFlow);
    setWorkBookData(res.data.workFlow);
  };
  const paginationData = (e, pageNo) => {
    getData(pageNo);
  };

  useEffect(() => {
    getData(1);
  }, []);
  const searchHandler = async (event) => {
    event.target.value.length === 0
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    try {
      const result = await axios.get(
        `/api/v1/main/search/workFlow/${event.target.value}`
      );
      console.log(result.data.workFlow);
      setShowSearchResult(true);
      setSearchResult(result.data.workFlow);
    } catch (error) {
      setSearchResult([]);
    }
  };
  return (
    <div className="m-5">
      <dir className="row d-flex justify-content-center mt-5">
        <div className="col-md-6 " style={{ position: "relative" }}>
          <input
            type="text"
            onChange={searchHandler}
            placeholder="Search Workflow by name"
            style={{ width: "100%", color: "rgba(0, 0, 0, 0.49)" }}
          />
          <div style={{ position: "absolute", right: "15px", top: 0 }}>
            <CloseIcon onClick={(e) => setShowSearchResult(false)} />
          </div>
        </div>
      </dir>

      {showSearchResult ? (
        <WorkFlowSearchList
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      ) : (
        <div className="container">
          <div>
            <div className=" row mt-3">
              {workBookData.map((workBookData) => (
                <div className="col-md-6 col-12">
                  <p key={workBookData._id}>
                    <div
                      className="pointer"
                      onClick={() => window.open(workBookData.link, "_blank")}
                    >
                      {workBookData.title}
                    </div>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="row  ">
            <div className="col d-flex justify-content-end">
              <Pagination
                count={Math.trunc(totalWorkFlow / limit) + 1}
                onChange={paginationData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWorkFlow;
