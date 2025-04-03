import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Discussion from "../../discussion/Discussion";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import parse from "html-react-parser";
import userDataContext from "../../../store/userData-context";
import LoginModalContext from "../../../store/openLoginModal-context";
import ShareModal from "../../shareModal/ShareModal";

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

const SingleToolNotebook = () => {
  const commentData = useRef(null);
  const userDataCtx = useContext(userDataContext);
  const LoginModalCtx = useContext(LoginModalContext);

  let params = useParams();
  useEffect(() => {
    getToolNotebookData();
  }, []);
  const [singleData, setSingleData] = useState(null);
  const [toolNotebookLike, setToolNoteBookLike] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [discussionData, setDiscussionData] = useState([]);
  const [pageNoComment, setPageNoComment] = useState(2);
  const getToolNotebookData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/toolNotebook/${params.toolNodeBookId}`
      );
      setToolNoteBookLike(
        res.data.toolNotebook.like.includes(userDataCtx.userData._id)
      );
      setDiscussionData(res.data.toolNotebook.discussion);
      setSingleData(res.data.toolNotebook);
    } catch (error) {
      console.log(error);
    }
  };

  const viewMoreHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/get/toolNotebook/comment/${params.toolNodeBookId}/2/${pageNoComment}`
      );
      setPageNoComment(pageNoComment + 1);
      setDiscussionData((discussionData) => {
        return [...discussionData, ...res.data.toolNotebook.discussion];
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
      const res = await axios.post(`/api/v1/user/comment/toolNotebook`, {
        comment: commentData.current.value,
        toolNotebookId: params.toolNodeBookId,
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
  let day = dateIs.getDate();
  let month = dateIs.getMonth();
  month = months[month];
  let year = dateIs.getFullYear();

  const likeHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/like/toolNotebook/${params.toolNodeBookId}`
      );
      setToolNoteBookLike((toolNotebookLike) => {
        return !toolNotebookLike;
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
            <div className="col-md-6 col-12 d-flex align-items-center ">
              <p className="h3">{singleData.title}</p>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="d-flex align-items-center offset-md-1 offset-0 col-2 me-2 me-md-0">
                  <div
                    style={{ width: "64px", maxHeight: "100%" }}
                    // className="d-flex align-items-center "
                  >
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
            <div className="row my-4  py-3 ">
              <div className="col d-flex justify-content-start ms-5">
                {toolNotebookLike ? (
                  <>
                    {" "}
                    <ThumbUpIcon color="primary" onClick={likeHandler} />{" "}
                    <span>{nFormatter(singleData.like.length)}</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <ThumbUpIcon onClick={likeHandler} />{" "}
                    <span> {nFormatter(singleData.like.length)}</span>
                  </>
                )}
              </div>
              <div className="col d-flex justify-content-end me-5">
                {/* <ShareIcon />
                 */}
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

export default SingleToolNotebook;
