import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
// import Discussion from "../../discussion/Discussion";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import parse from "html-react-parser";
// import userDataContext from "../../../store/userData-context";
// import LoginModalContext from "../../../store/openLoginModal-context";

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

const SingleNotebook = (props) => {
  // const commentData = useRef(null);
  // const userDataCtx = useContext(userDataContext);
  // const LoginModalCtx = useContext(LoginModalContext);

  let params = useParams();
  useEffect(() => {
    getNotebookData();
  }, []);
  const [singleData, setSingleData] = useState(null);
  const [notebookLike, setNoteBookLike] = useState(false);
  // const [showMore, setShowMore] = useState(true);
  // const [discussionData, setDiscussionData] = useState([]);
  // const [pageNoComment, setPageNoComment] = useState(2);
  const getNotebookData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/notebook/${params.nodeBookId}`
      );
      // setNoteBookLike(
      //     res.data.notebook.like.includes(userDataCtx.userData._id)
      // );
      // setDiscussionData(res.data.notebook.discussion);
      setSingleData(res.data.notebook);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await axios.get(
        `/api/v1/admin/aprove/noteBook/${params.nodeBookId}`
      );
      props.getNBData(props.pageNo);
    } catch (error) {}
  };

  // const viewMoreHandler = async () => {
  //     try {
  //         const res = await axios.get(
  //             `/api/v1/user/get/notebook/comment/${params.nodeBookId}/2/${pageNoComment}`
  //         );
  //         setPageNoComment(pageNoComment + 1);
  //         console.log(res.data.notebook.discussion);
  //         setDiscussionData((discussionData) => {
  //             return [...discussionData, ...res.data.notebook.discussion];
  //         });
  //         // if (!(res.data.notebook.discussion.length <= 2)) {
  //         //   setShowMore(false);
  //         // }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  // console.log(discussionData);
  // const commentHandler = async () => {
  //     try {
  //         const res = await axios.post(`/api/v1/user/comment/notebook`, {
  //             comment: commentData.current.value,
  //             notebookId: params.nodeBookId,
  //         });
  //         commentData.current.value = "";
  //         //push data to state
  //         setDiscussionData((discussionData) => {
  //             return [res.data.discussion, ...discussionData];
  //         });
  //         console.log(res);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  const dateIs = new Date(singleData && singleData.createdAt);
  let day = dateIs.getDate();
  let month = dateIs.getMonth();
  month = months[month];
  let year = dateIs.getFullYear();

  // const likeHandler = async () => {
  //     try {
  //         const res = await axios.get(
  //             `/api/v1/user/like/notebook/${params.nodeBookId}`
  //         );
  //         setNoteBookLike((notebookLike) => {
  //             return !notebookLike;
  //         });
  //     } catch (error) {
  //         LoginModalCtx.openLoginModal();
  //     }
  // };
  // console.log(singleData);
  return (
    <>
      {singleData ? (
        <div className="container">
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
                    />
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
            {/* <div className="row m-3">
              <div className="col-md-6 col-12 ">
                <p>Notebook link: {singleData.notebookLink}</p>
              </div>
              <div className="col-md-6 col-12 ">
                <p>Github link: {singleData.githubLink}</p>
              </div>
            </div> */}
            <div className="row m-3 d-flex justify-content-evenly">
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
            </div>
            <hr className="mt-4" />
            {/* <div className="row my-4  py-3 ">
                            <div className="col d-flex justify-content-start ms-5">
                                {notebookLike ? (
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
                <Link to="/unapproved_notebook">
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

export default SingleNotebook;
