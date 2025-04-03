import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const OmicsUC = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [OmicsData, setOmicsData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/Omics/UseCase/${limit}/${page}`
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setOmicsData(res.data.useCase);
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
      <h3 className="my-5">Omics</h3>
      <div>
        <div className=" row ">
          {OmicsData.map((OmicsData) => (
            <div className="col-md-6 col-12">
              <p key={OmicsData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(OmicsData._id)}
                >
                  {OmicsData.title}
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="row  ">
        <div className="col d-flex justify-content-end">
          <Pagination
            count={Math.trunc(totalUseCase / limit) + 1}
            onChange={paginationData}
          />
        </div>
      </div>
    </div>
  );
};

export default OmicsUC;
