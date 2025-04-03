import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Button from "@mui/material/Button";

const Subscribe = () => {
  const [subscribeData, setSubscribeData] = useState([]);
  const [totalSubscribe, setTotalSubscribe] = useState(null);

  const limit = 10;

  const paginationChange = (event, page) => {
    getData(page);
  };
  const downloadExcel = async (page) => {
    axios
      .get("/api/v1/admin/subscribe", {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `subscribe.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const getData = async (page) => {
    try {
      const res = await axios.get(`/api/v1/admin/subscribe/${limit}/${page}`);
      console.log(res);
      setSubscribeData(res.data.subscribe);
      setTotalSubscribe(res.data.totalSubscribe);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <>
      <div className="row" style={{ width: "70vw" }}>
        <div className="col ">
          <section>
            <div className="row p-3 mt-5 pb-1 pt-0">
              <div className="col">
                <h1>Subscribe </h1>
              </div>
            </div>
          </section>

          <section className="m-3">
            <table className="table table-borderless">
              <thead className=" border-shadow">
                <tr className="table-active">
                  <th scope="col" className="sm-table-data">
                    Email
                  </th>
                  <th scope="col">Frequency</th>
                  <th scope="col">User panel</th>
                </tr>
              </thead>

              <tbody>
                {subscribeData.map((data) => {
                  return (
                    <tr className=" border-shadow">
                      <td className="sm-table-data">{data.email}</td>
                      <td>{data.frequency}</td>
                      <td>{data.userPanel}</td>
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
                  count={Math.trunc(totalSubscribe / limit) + 1}
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

export default Subscribe;
