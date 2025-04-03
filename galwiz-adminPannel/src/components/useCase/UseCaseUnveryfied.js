import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import Cards from "../Cards/card";



import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CardUnveryfiedUsecases from "./cardUnveryfiedUsecases";


const limit = 12;

const UseCaseUnveryfied = () => {
  const [useCaseData, setUseCaseData] = useState([]);

  const navigate = useNavigate();
  const [totalNoteBook, setTotalNoteBook] = useState(0);
  const [totalUseCase, setTotalUseCase] = useState(0);
  
  const [notebookData, setNotebookData] = useState([]);
  const [totalToolNoteBook, setTotalToolNoteBook] = useState(0);
  const [toolNotebookData, setToolNotebookData] = useState([]);
  const [totalTopic, setTotalTopic] = useState({});
  const getNBData = async (page) => {
    const res = await axios.get(`/api/v1/user/get/notebook/${limit}/${page}`);
    // console.log(res)
    setTotalNoteBook(res.data.totalNoteBook);
    setNotebookData(res.data.notebook);
  };

  const getUCData = async (page) => {
    const res = await axios.get(`/api/v1/admin/unaproved/usecase/${limit}/${page}`);
    // console.log(res)
    setTotalUseCase(res.data.totalUserUseCase);
    setUseCaseData(res.data.useCase);
  };
  const getTotalTopic = async (page) => {
    const res = await axios.get(`/api/v1/main/home/total/topic`);
    console.log(res);
    setTotalTopic(res.data.data);
  };

  useEffect(() => {
    getNBData(1);
   
    getTotalTopic();
    getUCData(1);
  }, []);

 

  return (
    <>
    <div className="row d-flex justify-content-end">

    <div
         id="use_case"
         className=" row  d-flex flex-column justify-content-center mt-5 p-4"
         style={{
           backgroundColor: "rgb(238,238,238",
           minHeight: "500px",
          width:'80vw',
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
             <CardUnveryfiedUsecases key={uc._id} data={uc} index={index} 
             getUCData = {getUCData}
              />
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
                 getNBData(pageNo);
               }}
             />
           </div>
         </div>
       </div>
    </div>
     </>
  );
};

export default UseCaseUnveryfied;
