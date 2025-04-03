import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const LiteratureAndLanguageUC = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [LiteratureAndLanguageData, setLiteratureAndLanguageData] = useState(
    []
  );
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/LiteratureAndLanguage/UseCase/${limit}/${page}`
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setLiteratureAndLanguageData(res.data.useCase);
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
      <h3 className="my-5">LiteratureAndLanguage</h3>
      <div>
        <div className=" row ">
          {LiteratureAndLanguageData.map((LiteratureAndLanguageData) => (
            <div className="col-md-6 col-12">
              <p key={LiteratureAndLanguageData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(LiteratureAndLanguageData._id)}
                >
                  {LiteratureAndLanguageData.title}
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

export default LiteratureAndLanguageUC;
