import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

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

const SingleToolNotebook = (props) => {
  let params = useParams();
  useEffect(() => {
    getToolNotebookData();
  }, []);
  const [singleData, setSingleData] = useState(null);
  const getToolNotebookData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/toolNotebook/${params.nodeBookId}`
      );
      setSingleData(res.data.toolNotebook);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await axios.get(
        `/api/v1/admin/aprove/toolNotebook/${params.nodeBookId}`
      );
      props.getTNBData(props.pageNo);
    } catch (error) {
      console.log(error);
    }
  };

  const dateIs = new Date(singleData && singleData.createdAt);
  let day = dateIs.getDate();
  let month = dateIs.getMonth();
  month = months[month];
  let year = dateIs.getFullYear();

  // const likeHandler = async () => {
  //     try {
  //         const res = await axios.get(
  //             `/api/v1/user/like/toolNotebook/${params.toolNodeBookId}`
  //         );
  //         setToolNoteBookLike((toolNotebookLike) => {
  //             return !toolNotebookLike;
  //         });
  //     } catch (error) {
  //         LoginModalCtx.openLoginModal();
  //     }
  // };
  return (
    <>
      {singleData ? (
        <div className="container ">
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
            {/* <div className="col "></div> */}
            <div className="col">{parse(singleData.description)}</div>
            <div className="row m-3 d-flex justify-content-evenly">
              {singleData.noteBookLink ? (
                <div className="col-md-6 col-12 ">
                  <p>
                    Notebook link:{" "}
                    <span
                      className="pointer"
                      onClick={() =>
                        window.open(singleData.noteBookLink, "_blank")
                      }
                    >
                      {singleData.noteBookLink}
                    </span>
                  </p>
                </div>
              ) : (
                ""
              )}

              {singleData.githubLink ? (
                <div className="col-md-6 col-12 ">
                  <p>
                    Github link:{" "}
                    <span
                      className="pointer"
                      onClick={() =>
                        window.open(singleData.githubLink, "_blank")
                      }
                    >
                      {singleData.githubLink}
                    </span>
                  </p>
                </div>
              ) : (
                ""
              )}
              {singleData.repoLink ? (
                <div className="col-md-6 col-12 ">
                  <p>
                    Repo link:{" "}
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
            {/* <div className="row my-4  py-3 ">
                            <div className="col d-flex justify-content-start ms-5">
                                {toolNotebookLike ? (
                                    <ThumbUpIcon color="primary" onClick={likeHandler} />
                                ) : (
                                    <ThumbUpIcon onClick={likeHandler} />
                                )}
                            </div>
                            <div className="col d-flex justify-content-end me-5">
                                <ShareIcon />
                            </div>
                        </div>
                        <Discussion
                            commentData={commentData}
                            discussionData={discussionData}
                            commentHandler={commentHandler}
                        />
                        {showMore ? (
                            <div
                                className="d-flex justify-content-center "
                                style={{ cursor: "pointer" }}
                                onClick={viewMoreHandler}
                            >
                                <p>View More Comment</p>
                            </div>
                        ) : (
                            ""
                        )} */}

            <div className="row mb-2">
              <div className="col d-flex justify-content-center">
                <Link to="/unapproved_tool_notebook">
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

export default SingleToolNotebook;
