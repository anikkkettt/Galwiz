import React, { useContext, useState } from "react";
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

const ReplyComment = (props) => {
  const userDataCtx = useContext(userDataContext);
  const LoginModalCtx = useContext(LoginModalContext);
  const [replyLike, setReplyLike] = useState(
    props.replyItem.like.includes(userDataCtx.userData._id)
  );
  const likeHandler = async () => {
    try {
      const res = await axios.get(
        `/api/v1/user/like/reply/comment/${props.replyItem._id}`
      );
      setReplyLike((replyLike) => {
        return !replyLike;
      });
    } catch (error) {
      LoginModalCtx.openLoginModal();
    }
  };
  return (
    <div>
      <section>
        <div className="row">
          <div className="col d-flex">
            <img
              src={`/api/v1/user/image/${props.replyItem.user.photo}`}
              alt="user"
              className="align-self-start sm-comment"
              style={{ visibility: "hidden", marginLeft: "-20px" }}
            />
            <div className="col d-flex justify-content-start align-items-center">
              <img
                src={`/api/v1/user/image/${props.replyItem.user.photo}`}
                alt={props.item.user.firstName}
                className="align-self-start sm-comment"
                style={{ marginLeft: "-20px" }}
              />
              <div className="col pt-md-4 ms-md-2 mt-sm-2 d-flex flex-column justify-content-start">
                <h4>
                  {props.replyItem.user.firstName}{" "}
                  {props.replyItem.user.lastName}
                </h4>
                <p style={{ color: "#646D72" }}>
                  {timeSince(new Date(props.replyItem.createdAt))}
                </p>
                <p>{props.replyItem.reply}</p>

                <div className="row">
                  <div className="col">
                    <p>
                      {replyLike ? (
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
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReplyComment;
