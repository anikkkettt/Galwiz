import React, { useContext, useState, useEffect } from "react";
import userDataContext from "../../store/userData-context";

const ProfileImageTag = (props) => {
  const userDataCtx = useContext(userDataContext);
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(userDataCtx.userData.photo);
  }, [userDataCtx.userData.photo]);
  return (
    <>
      {props.image ? (
        <img
          src={`/api/v1/user/image/${props.image}`}
          alt=""
          className="fluid w-50 border border-warning"
          style={{
            maxHeight: "200px",
            maxWidth: "200px",
            minHeight: "150px",
            minWidth: "150px",
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileImageTag;
