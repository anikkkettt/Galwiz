import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const SingleUseCase = (props) => {

    let params = useParams();
    useEffect(() => {
        getUseCaseData();
    }, []);
    const [singleData, setSingleData] = useState(null);
    const getUseCaseData = async () => {
        try {
            // console.log("akash")
            // console.log(params)
            const res = await axios.get(
                `/api/v1/user/get/useCase/${params.useCaseId}`
            );
            setSingleData(res.data.useCase);
        } catch (error) {
            console.log(error);
        }
    };


    const handleVerify = async (id) => {
        try {
          const res = await axios.get(`/api/v1/admin/aprove/usecase/${params.useCaseId}`);
          props.getUCData();
        } catch (error) {
    
        }
      };


    const dateIs = new Date(singleData && singleData.createdAt);

    const imageData =
        singleData &&
        `<img src="/api/v1/main/image/${singleData.photo}" alt="user" style= "float: left; width:50vw; margin: 0 15px 0 0" ;/>`;
    const description =
        singleData && singleData.description.replace("<div>", `<div>${imageData}`);
    let day = dateIs.getDate();
    let month = dateIs.getMonth();
    month = months[month];
    let year = dateIs.getFullYear();

    return (
        <>
            {singleData ? (
                <div>
                    <div className="row m-1 px-1 py-1 bg-body shadow">
                        <div className="col-md-6 col-12 ">
                            <p className="h1">{singleData.title}</p>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row">
                                <div className="offset-md-1 offset-0 col-2 me-2 me-md-0">
                                    <div style={{ width: "64px", maxHeight: "100%" }}>
                                        <img
                                            src={`/api/v1/user/image/${singleData.user.photo}`}
                                            alt="user"
                                        ></img>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <p className="h4">{`Name : ${singleData.user.firstName} ${singleData.user.lastName}`}</p>
                                    <p className="h5">{`${month} ${day} ${year}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-2 px-1 py-1 bg-body shadow">
                        <div className="col">{parse(description)}</div>
                        <div className="row m-3 d-flex justify-content-evenly">
                            {singleData.workflowLink ? (
                                <div className="col-md-6 col-12 ">
                                    <p>
                                        Workflow link:{" "}
                                        <span
                                            className="pointer"
                                            onClick={() =>
                                                window.open(singleData.workflowLink, "_blank")
                                            }
                                        >
                                            {singleData.workflowLink}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                ""
                            )}

                            {singleData.historyLink ? (
                                <div className="col-md-6 col-12 ">
                                    <p>
                                        History link:{" "}
                                        <span
                                            className="pointer"
                                            onClick={() =>
                                                window.open(singleData.historyLink, "_blank")
                                            }
                                        >
                                            {singleData.historyLink}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                ""
                            )}

                            {singleData.notebookLink ? (
                                <div className="col-md-6 col-12 ">
                                    <p>
                                        Notebook link:{" "}
                                        <span
                                            className="pointer"
                                            onClick={() =>
                                                window.open(singleData.notebookLink, "_blank")
                                            }
                                        >
                                            {singleData.notebookLink}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                ""
                            )}

                            {singleData.repoLink ? (
                                <div className="col-md-6 col-12 ">
                                    <p>
                                        Github repo/link:{" "}
                                        <span
                                            className="pointer"
                                            onClick={() => window.open(singleData.repoLink, "_blank")}
                                        >
                                            {singleData.repoLink}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <hr className="mt-4" />


                        <div className="row mb-2">
              <div className="col d-flex justify-content-center">
                <Link to="/unapproved_use_case">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      minWidth: "20%",

                      // color: props.colorLink,
                      textDecoration: "none",
                    }}
                    onClick={() => handleVerify(props.id_un)}
                  >
                    Verify
                  </button>
                </Link>
              </div>
            </div>





                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default SingleUseCase;
