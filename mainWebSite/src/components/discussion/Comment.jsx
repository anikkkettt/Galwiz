import React, { useContext, useRef, useState, useEffect } from "react";
import ReplyComment from "./ReplyComment";
import userDataContext from "../../store/userData-context";
import LoginModalContext from "../../store/openLoginModal-context";
import axios from "axios";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const Comment = (props) => {
  const userDataCtx = useContext(userDataContext);
  const LoginModalCtx = useContext(LoginModalContext);
  const replyData = useRef(null);
  const [replyBox, setReplyBox] = useState(false);
  const [replyDataArray, setReplyDataArray] = useState([]);
  const [commentLike, setCommentLike] = useState(
    props.item.like.includes(userDataCtx.userData._id)
  );
  useEffect(() => {
    setReplyDataArray(props.item.reply);
  }, [props.item.reply]);
  const replyOnCommentHandler = async (commentId) => {
    try {
      const res = await axios.post(`/api/v1/user/reply/comment`, {
        reply: replyData.current.value,
        discussionId: commentId,
      });
      replyData.current.value = "";
      //
      let disData = props.discussionData;
      for (let i = 0; i < disData.length; i++) {
        const element = disData[i];
        if (element._id === props.item._id) {
          element.reply.push(res.data.discussionReply);
        }
      }
      props.setDiscussionData([...disData]);

      // setReplyDataArray((replyDataArray) => {
      //   return [...replyDataArray, res.data.discussionReply];
      // });
      setReplyBox(false);
    } catch (error) {
      console.log("error");
    }
  };

  const likeHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/like/comment/${props.item._id}`
      );
      setCommentLike((commentLike) => {
        return !commentLike;
      });
    } catch (error) {
      LoginModalCtx.openLoginModal();
    }
  };

  return (
    <div>
      <section>
        <div className="row mt-2 m-md-2 md-ms-5 md-me-5">
          <div className="col d-flex justify-content-start align-items-center">
            <img
              src={`/api/v1/user/image/${props.item.user.photo}`}
              alt="user"
              className="align-self-start sm-comment"
              style={{ marginLeft: "-20px" }}
            />
            <div className="col pt-md-4 ms-md-2 mt-sm-2 d-flex flex-column justify-content-start">
              <h4>
                {props.item.user.firstName} {props.item.user.lastName}
              </h4>
              <p style={{ color: "#646D72" }}>
                {timeSince(new Date(props.item.createdAt))}
              </p>
              <p>{props.item.comment}</p>
              <div className="row">
                <div className="col">
                  <p>
                    {commentLike ? (
                      <span onClick={likeHandler}>
                        <i
                          class="bi bi-hand-thumbs-up-fill"
                          style={{ color: "cornflowerblue" }}
                        ></i>
                        <span
                          className="ms-1"
                          style={{ cursor: "pointer", color: "#646D72" }}
                        >
                          Liked
                        </span>
                      </span>
                    ) : (
                      <span onClick={likeHandler}>
                        <i class="bi bi-hand-thumbs-up-fill"></i>
                        <span
                          className="ms-1"
                          style={{ cursor: "pointer", color: "#646D72" }}
                        >
                          Like
                        </span>
                      </span>
                    )}

                    <span
                      className="ms-5"
                      style={{ cursor: "pointer", color: "#646D72" }}
                      onClick={() => {
                        userDataCtx.userData.auth
                          ? setReplyBox(true)
                          : LoginModalCtx.openLoginModal();
                      }}
                    >
                      Reply
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {replyDataArray.map((replyItem) => {
        return (
          <ReplyComment
            key={replyItem.id}
            replyItem={replyItem}
            item={props.item}
          />
        );
      })}
      {replyBox ? (
        userDataCtx.userData.auth ? (
          <section>
            <div className="row">
              <div className="col d-flex align-items-center">
                <img
                  src={`/api/v1/user/image/${userDataCtx.userData.photo}`}
                  alt="user"
                  className="align-self-start sm-comment"
                  style={{ visibility: "hidden", marginLeft: "-20px" }}
                />
                <div className="col d-flex justify-content-start align-items-center">
                  <img
                    src={`/api/v1/user/image/${userDataCtx.userData.photo}`}
                    alt="user"
                    className="align-self-start sm-comment"
                    style={{ marginLeft: "-20px" }}
                  />
                  <div className="col pt-md-4 ms-md-2 mt-sm-2 d-flex flex-column justify-content-start">
                    <textarea
                      rows="2"
                      cols="50"
                      className="comment-box"
                      placeholder=" Add a reply................."
                      ref={replyData}
                    />
                    <div className="row">
                      <div className="col-md-10 mt-3 d-flex justify-content-center justify-content-md-end">
                        <button
                          type="button"
                          className="btn btn-dark m-2 ms-0"
                          style={{
                            backgroundColor: "#626161",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setReplyBox(false);
                          }}
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          className="btn btn-dark m-2"
                          style={{ backgroundColor: "#3C3939" }}
                          onClick={() => {
                            // setReplyBox(false);
                            replyOnCommentHandler(props.item._id);
                          }}
                        >
                          REPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <div className="row pt-2">
              <div className="col d-flex">
                <div className="col d-flex justify-content-center align-items-center">
                  <p className="h2" onClick={LoginModalCtx.openLoginModal}>
                    Login to Reply
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comment;
