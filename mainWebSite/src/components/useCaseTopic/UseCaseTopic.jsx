// import React from "react";
// import { Link, useParams } from "react-router-dom";
// const UseCaseTopic = () => {
//   const { useCaseTopic, useCaseSubTopic } = useParams();
//   return (
//     <div>
//       {useCaseTopic}
//       {"   "}
//       {useCaseSubTopic}{" "}
//     </div>
//   );
// };

// export default UseCaseTopic;

import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "../../api/axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const limit = 24;

const UseCaseTopic = () => {
  const [totalUseCase, setTotalUseCase] = useState(0);
  const [biologyData, setBiologyData] = useState([]);
  let { useCaseTopic, useCaseSubTopic } = useParams();
  let topic = "";
  let subTopic = "";

  topic = useCaseTopic.replaceAll("_", " ");

  subTopic = useCaseSubTopic.replaceAll("_", " ");

  const getData = async (page) => {
    const res = await axios.post(
      `/api/v1/user/get/topic/useCase/${limit}/${page}`,
      {
        useCaseTopic: topic,
        useCaseSubTopic: subTopic,
      }
    );
    setTotalUseCase(res.data.totalUserUseCase);
    setBiologyData(res.data.useCase);
  };
  const paginationData = (e, pageNo) => {
    getData(pageNo);
  };

  useEffect(() => {
    getData(1);
  }, [useCaseSubTopic]);

  const navigate = useNavigate();
  return (
    <div className="m-5">
      <h3 className="my-5">
        {topic} {subTopic}{" "}
      </h3>
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
            count={Math.trunc(totalUseCase / limit) + 1}
            onChange={paginationData}
          />
        </div>
      </div>
    </div>
  );
};

export default UseCaseTopic;
