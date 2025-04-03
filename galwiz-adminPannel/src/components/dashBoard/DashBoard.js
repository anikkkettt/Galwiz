import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Dashboard = () => {
  const [totalTopic, setTotalTopic] = useState({});
  const [totalUser, setTotalUser] = useState({});

  const getTotalTopic = async (page) => {
    const res = await axios.get(`/api/v1/main/home/total/topic`);
    const res2 = await axios.get(`api/v1/admin/totalUser`);
    
 
    setTotalUser(res2.data);
    
    setTotalTopic(res.data.data);
  };
  useEffect(() => {
   
    getTotalTopic();
   
  }, []);

  return (
 <>
  <div className="row  d-flex justify-content-center" style={{width:'60vw'}}>
<div className="col d-flex justify-content-center align-items-center " >
<div className="row d-flex justify-content-center p-5 text-center align-items-center" style={{width:'100%'}}>


  <div className="col-md-3 mt-2 m-5 p-3 shadow d-flex flex-column justify-content-center align-items-center "> <span className="h1" style={{fontWeight:'bold', color:'blue'}}>{totalTopic.totalWorkFlow}</span> <p className="h3 border-bottom border-3 border-secondary" style={{ fontWeight:'bold'}}>Workflows</p> </div>

  <div className="col-md-3 mt-2 m-5 p-3 shadow d-flex flex-column justify-content-center align-items-center "> <span className="h1" style={{fontWeight:'bold', color:'blue'}}>
  {totalTopic.totalUseCase}</span> <p className="h3 border-bottom border-3 border-secondary" style={{fontWeight:'bold'}}> Use cases</p> </div>

  <div className="col-md-3 mt-2 m-5 p-3 shadow d-flex flex-column justify-content-center align-items-center " > <span className="h1" style={{fontWeight:'bold', color:'blue'}}>{
    totalTopic.totalToolNoteBook
  }</span> <p className="h3 border-bottom border-3 border-secondary" style={{fontWeight:'bold'}}>Tool Notebooks</p> </div>

  <div className="col-md-3 mt-2 m-5 p-3 shadow d-flex flex-column justify-content-center align-items-center "> <span className="h1" style={{fontWeight:'bold', color:'blue'}}>{
    totalTopic.totalNoteBook
  }</span> <p className="h3 border-bottom border-3 border-secondary" style={{fontWeight:'bold'}}>Notebooks</p> </div>

  <div className="col-md-3 mt-2 m-5 p-3 shadow d-flex flex-column justify-content-center align-items-center "> <span className="h1" style={{fontWeight:'bold', color:'blue'}}>{ 
 totalUser.totalUser
  }</span> <p className="h3 border-bottom border-3 border-secondary" style={{fontWeight:'bold'}}>Users</p> </div>





</div>
  
</div>
  </div>




 </>
  );
};

export default Dashboard;
