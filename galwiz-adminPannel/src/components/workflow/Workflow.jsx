import { Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const limit = 12;
const Workflow = () => {
  const [page, setPage] = useState(1);
  const [totalWorkFlow, setTotalWorkFlow] = useState(0);
  const [workFlowData, setWorkFlowData] = useState([]);

  const getData = async (page) => {
    const res = await axios.get(`/api/v1/main/get/workFlow/${limit}/${page}`);
    console.log(res)
    setTotalWorkFlow(res.data.totalWorkFlow);
    setWorkFlowData(res.data.workFlow);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='m-0 ms-lg-5'>
      <h1 className='pt-5 mt-5'>Workflow</h1>
      <table>
        <tr>
          <th>
            Title
          </th>
          <th>
            Link
          </th>
        </tr>
        {workFlowData.map((wf => (
          <tr>
            <td className='p-1'>
              {wf.title}
            </td>
            <td onClick={() =>
              window.open(
                `${wf.link}`,
                "_blank"
              )
            }
              style={{ cursor: "pointer", color: "blue" }}
            >
              {wf.link}
            </td>
          </tr>
        )))}
      </table>
      <div className="row  mt-4 ">
        <div className="col d-flex justify-content-center">
          <Pagination
            count={Math.trunc(totalWorkFlow / limit) + 1}
            onChange={(e, pageNo) => {
              console.log(pageNo);
              getData(pageNo);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Workflow
