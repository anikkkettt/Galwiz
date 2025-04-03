import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import download from "downloadjs";
const Feedback = () => {
  let navigate = useNavigate();
  ///feedback
  const [feedbackData, setFeedbackData] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState(null);
  const limit = 10;
  const paginationChange = (event, page) => {
    getData(page);
  };
  const getData = async (page) => {
    try {
      const res = await axios.get(`/api/v1/admin/feedback/${limit}/${page}`);

      setFeedbackData(res.data.feedback);
      setTotalFeedback(res.data.totalFeedBack);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = async (page) => {
    axios
      .get("/api/v1/admin/feedback", {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `feedback.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  useEffect(() => {
    getData(1);
  }, []);
  console.log(window.location.origin);
  return (
    <>
      <div className="row" style={{ width: "70vw" }}>
        <div className="col ">
          <section>
            <div className="row p-3 mt-5 pb-1 pt-0">
              <div className="col">
                <h1>Feedback </h1>
              </div>
            </div>
          </section>

          <section className="m-3">
            <table className="table table-borderless">
              <thead className=" border-shadow">
                <tr className="table-active">
                  <th scope="col" className="sm-table-data">
                    Name
                  </th>
                  <th scope="col">Email</th>
                  <th scope="col">Massage</th>
                </tr>
              </thead>

              <tbody>
                {feedbackData.map((data) => {
                  return (
                    <tr className=" border-shadow">
                      <td className="sm-table-data">{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.message}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section>
            <div className="row mt-5 d-flex justify-content-between align-items-center">
              <div className="col mx-5 d-flex justify-content-start">
                <Button onClick={downloadExcel} variant="contained">
                  Download Excel
                </Button>
              </div>
              <div className="col  d-flex justify-content-end">
                <Pagination
                  count={Math.trunc(totalFeedback / limit) + 1}
                  onChange={paginationChange}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Feedback;
