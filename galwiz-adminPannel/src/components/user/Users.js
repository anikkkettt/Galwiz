import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
//http://localhost:8082/api/v1/admin/user/20/1

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [totalUser, setTotalUser] = useState(null);
  const limit = 10;
  const paginationChange = (event, page) => {
    getData(page);
  };

  useEffect(() => {
    getData(1);
  }, []);
  const getData = async (page) => {
    try {
      const res = await axios.get(`/api/v1/admin/user/${limit}/${page}`);
      // console.log(Math.trunc((res.data.totalUser/10))+1);
      setTotalUser(res.data.totalUser);
      setUserData(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    }
    userData.map((data) => {
      console.log(data.firstName);
    });
  };

  return (
    <>
      <section>
        <div className="row p-3 pb-1 pt-0">
          <div className="col">
            <h1> All Users</h1>
          </div>
        </div>
      </section>
      <section className="m-3">
        <table className="table table-borderless">
          <thead className=" border-shadow">
            <tr className="table-active">
              <th scope="col" className="text-center">
                Full Name
              </th>
              <th scope="col" className="sm-table-data">
                Email
              </th>
              <th scope="col">Github User Name</th>
              <th scope="col">Email Verify</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((data) => {
              return (
                <tr className=" border-shadow">
                  <td scope="row" className=" d-flex justify-content-start">
                    <img
                      src="/images/Logo.png"
                      className="me-3"
                      style={{ width: "2rem" }}
                      alt=""
                    />{" "}
                    <p>
                      {data.firstName} {data.lastName}
                    </p>{" "}
                  </td>
                  <td className="sm-table-data">{data.email}</td>
                  <td>{data.githubUserName}</td>
                  <td>
                    {data.emailApprove ? (
                      <input
                        className="form-check-input"
                        disabled
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      ></input>
                    ) : (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        disabled
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <div className="row mt-5 d-flex justify-content-end ">
          <div className="col  d-flex justify-content-end">
            <Pagination
              count={Math.trunc(totalUser / limit) + 1}
              onChange={paginationChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
