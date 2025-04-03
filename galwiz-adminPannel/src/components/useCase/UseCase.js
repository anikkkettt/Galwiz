import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import Cards from "../Cards/card";



import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";


const limit = 12;

const UseCase = () => {
  const [useCaseData, setUseCaseData] = useState([]);

  const navigate = useNavigate();
  
  const [totalUseCase, setTotalUseCase] = useState(0);
  
  
  const [totalTopic, setTotalTopic] = useState({});
  
  

  const getUCData = async (page) => {
    const res = await axios.get(`/api/v1/admin/get/UseCase/${limit}/${page}`);
     console.log(res)
    setTotalUseCase(res.data.totalUseCase);
    setUseCaseData(res.data.useCase);
  };


  useEffect(() => {
   
   
   
    getUCData(1);
  }, []);

  return (
    <>
   <div
        id="use_case"
        className=" d-flex flex-column justify-content-center mt-5  p-4"
        style={{
          backgroundColor: "rgb(238,238,238",
          minHeight: "500px",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <h1 className="py-3" style={{ textAlign: "center", fontSize: "60px" }}>
          Latest Use Cases
        </h1>
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
          {useCaseData.map((uc, index) => (
            <Cards key={uc._id} data={uc} index={index} />
          ))}
          {/* <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} />
          <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} />
          <Cards backgroundColor={oddColor} />
          <Cards backgroundColor={evenColor} /> */}
        </div>

        <div className="row  d-flex justify-content-center ">
          <div className="col d-flex justify-content-center">
            <Pagination
              count={Math.trunc(totalUseCase / limit) + 1}
              onChange={(e, pageNo) => {
                getUCData(pageNo);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UseCase;
