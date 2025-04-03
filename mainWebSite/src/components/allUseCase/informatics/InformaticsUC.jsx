import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const InformaticsUC = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [InformaticsData, setInformaticsData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/Informatics/UseCase/${limit}/${page}`
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setInformaticsData(res.data.useCase);
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
      <h3 className="my-5">Informatics</h3>
      <div>
        <div className=" row ">
          {InformaticsData.map((InformaticsData) => (
            <div className="col-md-6 col-12">
              <p key={InformaticsData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(InformaticsData._id)}
                >
                  {InformaticsData.title}
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

export default InformaticsUC;
