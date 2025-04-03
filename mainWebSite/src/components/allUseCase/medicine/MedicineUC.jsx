import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const limit = 24;

const MedicineUC = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [MedicineData, setMedicineData] = useState([]);
  const getData = async (page) => {
    const res = await axios.get(
      `/api/v1/user/get/Medicine/UseCase/${limit}/${page}`
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setMedicineData(res.data.useCase);
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
      <h3 className="my-5">Medicine</h3>
      <div>
        <div className=" row ">
          {MedicineData.map((MedicineData) => (
            <div className="col-md-6 col-12">
              <p key={MedicineData._id}>
                <div
                  className="pointer"
                  onClick={(e) => navigate(MedicineData._id)}
                >
                  {MedicineData.title}
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

export default MedicineUC;
