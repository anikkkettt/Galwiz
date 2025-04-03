import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Discussion from "../../discussion/Discussion";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareModal from "../../shareModal/ShareModal";
import axios from "axios";
import parse from "html-react-parser";
import userDataContext from "../../../store/userData-context";
import LoginModalContext from "../../../store/openLoginModal-context";

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

function nFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

const SingleUseCase = () => {
  const commentData = useRef(null);
  const userDataCtx = useContext(userDataContext);
  const LoginModalCtx = useContext(LoginModalContext);

  let params = useParams();
  useEffect(() => {
    getUseCaseData();
  }, []);
  const [singleData, setSingleData] = useState(null);
  const [useCaseLike, setUseCaseLike] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [discussionData, setDiscussionData] = useState([]);
  const [pageNoComment, setPageNoComment] = useState(2);
  const getUseCaseData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/useCase/${params.use_caseId}`
      );
      setUseCaseLike(res.data.useCase.like.includes(userDataCtx.userData._id));
      setDiscussionData(res.data.useCase.discussion);
      setSingleData(res.data.useCase);
    } catch (error) {
      console.log(error);
    }
  };

  const viewMoreHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/useCase/comment/${params.use_caseId}/2/${pageNoComment}`
      );
      setPageNoComment(pageNoComment + 1);
      setDiscussionData((discussionData) => {
        return [...discussionData, ...res.data.useCase.discussion];
      });
      // if (!(res.data.notebook.discussion.length <= 2)) {
      //   setShowMore(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(`/api/v1/user/comment/useCase`, {
        comment: commentData.current.value,
        useCaseId: params.use_caseId,
      });
      commentData.current.value = "";
      //push data to state
      setDiscussionData((discussionData) => {
        return [res.data.discussion, ...discussionData];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dateIs = new Date(singleData && singleData.createdAt);

  const imageData =
    singleData &&
    `<img src="/api/v1/main/image/${singleData.photo}" alt="user" style= "float: left; width:50vw; margin: 0 15px 0 0" ;/>`;
  const description =
    singleData && singleData.description.replace(">", `>${imageData}`);
  let day = dateIs.getDate();
  let month = dateIs.getMonth();
  month = months[month];
  let year = dateIs.getFullYear();

  const likeHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/like/useCase/${params.use_caseId}`
      );
      setUseCaseLike((useCaseLike) => {
        return !useCaseLike;
      });
    } catch (error) {
      LoginModalCtx.openLoginModal();
    }
  };
  return (
    <>
      {singleData ? (
        <div className="container">
          <div className="row m-1 px-1 py-1 bg-body shadow">
            <div className="col-md-6 col-12 d-flex align-items-center">
              <p className="h3">{singleData.title}</p>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="d-flex align-items-center offset-md-1 offset-0 col-2 me-2 me-md-0">
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
          <div className="row m-1 px-1 py-1 bg-body shadow">
            {/* <div className="col "></div> */}
            {/* <img
              src={`/api/v1/main/image/${singleData.photo}`}
              alt="useCase"
            ></img> */}
            <div className="col">{parse(description)}</div>
            {/* <div className="row m-3">
              <div className="col-md-6 col-12 ">
                <p>Workflow link: {singleData.workflowLink}</p>
              </div>
              <div className="col-md-6 col-12 ">
                <p>History link: {singleData.historyLink}</p>
              </div>
            </div>
            <div className="row m-3">
              <div className="col-md-6 col-12 ">
                <p>Relevant Notebook link: {singleData.notebookLink}</p>
              </div>
              <div className="col-md-6 col-12 ">
                <p>Github repo/link: {singleData.repoLink}</p>
              </div>
            </div> */}

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
            <div className="row my-4  py-3 ">
              <div className="col d-flex justify-content-start ms-5">
                {useCaseLike ? (
                  <>
                    {" "}
                    <ThumbUpIcon color="primary" onClick={likeHandler} />
                    {"  "}
                    <span> {nFormatter(singleData.like.length)}</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <ThumbUpIcon onClick={likeHandler} />
                    {"  "}
                    <span> {nFormatter(singleData.like.length)}</span>
                  </>
                )}
              </div>
              <div className="col d-flex justify-content-end me-5">
                <ShareModal />
              </div>
            </div>
            <Discussion
              commentData={commentData}
              discussionData={discussionData}
              commentHandler={commentHandler}
              setDiscussionData={setDiscussionData}
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
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleUseCase;
