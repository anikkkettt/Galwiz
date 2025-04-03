import React, { useState, useContext, useRef } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import userDataContext from "../../store/userData-context";
import LoginModalContext from "../../store/openLoginModal-context";
import Comment from "./Comment";

const Discussion = (props) => {
  const userDataCtx = useContext(userDataContext);
  const LoginModalCtx = useContext(LoginModalContext);
  // console.log(props.discussionData);
  // console.log(replyBox);
  return (
    <>
      <section>
        <div className="row border-top border-bottom">
          <div className="col d-flex align-items-center p-3">
            <img className="img-responsive" src="/images/Group.png" alt="" />
            <h2 className="ms-5">Discussion</h2>
          </div>
        </div>
      </section>
      {userDataCtx.userData.auth ? (
        <section>
          <div className="row m-2">
            <div className="col d-flex align-items-center">
              <div className="col d-flex justify-content-start align-items-center">
                <img
                  src={`/api/v1/user/image/${userDataCtx.userData.photo}`}
                  alt="user"
                  className="align-self-start sm-comment"
                  style={{ marginLeft: "-20px" }}
                />
                <div className="col  ms-md-2 mt-sm-2 d-flex flex-column justify-content-start">
                  <textarea
                    rows="2"
                    cols="50"
                    className="comment-box"
                    ref={props.commentData}
                    placeholder=" Add a comment ................."
                  />
                  <div className="row">
                    <div className="col-md-10 mt-3 d-flex  justify-content-center justify-content-md-end">
                      <button
                        type="button"
                        onClick={() => props.commentHandler()}
                        className="btn btn-dark m-2 align-self-end"
                        style={{ backgroundColor: "#3C3939" }}
                      >
                        POST COMMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="row pt-2">
            <div className="col d-flex">
              <div className="col d-flex justify-content-center align-items-center">
                <p className="h2" onClick={LoginModalCtx.openLoginModal}>
                  Login to Comment
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {props.discussionData.map((item) => (
        <Comment
          key={item.id}
          item={item}
          discussionData={props.discussionData}
          setDiscussionData={props.setDiscussionData}
          replyOnCommentHandler={props.replyOnCommentHandler}
        />
      ))}
    </>
  );
};

export default Discussion;
