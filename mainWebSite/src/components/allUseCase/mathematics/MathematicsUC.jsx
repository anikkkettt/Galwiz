import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const MathematicsUC = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [MathematicsData, setMathematicsData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/Mathematics/UseCase/${limit}/${page}`
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setMathematicsData(res.data.useCase);
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
      <h3 className="my-5">Mathematics</h3>
      <div>
        <div className=" row ">
          {MathematicsData.map((MathematicsData) => (
            <div className="col-md-6 col-12">
              <p key={MathematicsData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(MathematicsData._id)}
                >
                  {MathematicsData.title}
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

export default MathematicsUC;
